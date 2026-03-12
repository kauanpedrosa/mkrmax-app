from flask import Flask, request, jsonify
from config import Config
from models import db, Usuario, Perfil, Filme, Serie
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Criar banco
with app.app_context():
    db.create_all()


# =============================
# ROTA DE REGISTER
# =============================
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")

    if Usuario.query.filter_by(email=email).first():
        return jsonify({"erro": "Email já cadastrado"}), 400

    senha_hash = bcrypt.generate_password_hash(senha).decode("utf-8")

    novo_usuario = Usuario(
        nome=nome,
        email=email,
        senha=senha_hash,
        pago=False
    )

    db.session.add(novo_usuario)
    db.session.commit()

    # Criar perfil automaticamente
    perfil = Perfil(usuario_id=novo_usuario.id)
    db.session.add(perfil)
    db.session.commit()

    return jsonify({"mensagem": "Usuário criado com sucesso"}), 201


# =============================
# ROTA DE LOGIN
# =============================
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    senha = data.get("senha")

    usuario = Usuario.query.filter_by(email=email).first()

    if not usuario or not bcrypt.check_password_hash(usuario.senha, senha):
        return jsonify({"erro": "Credenciais inválidas"}), 401

    access_token = create_access_token(identity=usuario.id)

    return jsonify({
        "token": access_token,
        "usuario": usuario.nome,
        "pago": usuario.pago
    }), 200


# =============================
# ROTA PROTEGIDA
# =============================
@app.route("/filmes", methods=["GET"])
@jwt_required()
def listar_filmes():
    usuario_id = get_jwt_identity()
    usuario = Usuario.query.get(usuario_id)

    if not usuario.pago:
        return jsonify({"erro": "Assinatura necessária"}), 403

    filmes = Filme.query.all()

    resultado = []
    for filme in filmes:
        resultado.append({
            "id": filme.id,
            "descricao": filme.descricao,
            "genero": filme.genero,
            "duracao": filme.duracao,
            "fotos": filme.fotos
        })

    return jsonify(resultado)


if __name__ == "__main__":
    app.run(debug=True)