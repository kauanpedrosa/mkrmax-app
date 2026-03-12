from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    pago = db.Column(db.Boolean, default=False)

    perfil = db.relationship("Perfil", backref="usuario", uselist=False)


class Perfil(db.Model):
    __tablename__ = "perfis"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)


class Filme(db.Model):
    __tablename__ = "filmes"

    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.Text, nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    duracao = db.Column(db.Integer, nullable=False)
    fotos = db.Column(db.Text)  # Urls


class Serie(db.Model):
    __tablename__ = "series"

    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.Text, nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    duracao = db.Column(db.Integer, nullable=False)
    fotos = db.Column(db.Text)