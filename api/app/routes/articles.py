from flask import Blueprint, jsonify, request
from app.models import db, Article, Categorie_article, Category
from sqlalchemy import func
from app.utils import validate_api_key

articles_bp = Blueprint('articles', __name__)

@articles_bp.before_request
def check_api_key():
    if request.method == 'OPTIONS': # Handle preflight requests to enable CORS
        return
    api_key = request.headers.get('X-API-Key')  # Get the api key from the header
    
    # Verify the api key
    if not validate_api_key(api_key):
        return jsonify({'message': 'Invalide API KEY'}), 401

# Secure routes

# ------------------------------------GET------------------------------------#

# Route for get article by id
@articles_bp.route('/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = db.session.query(Article.id, Article.title, Article.description, Article.content, Article.created_at, Article.preview_picture,
                               func.group_concat(Categorie_article.id_category).label('category_ids'))\
        .join(Categorie_article, Article.id == Categorie_article.id_article)\
        .filter(Article.id == article_id)\
        .group_by(Article.id)\
        .first()

    if article:
        article_data = {
            'id': article.id,
            'title': article.title,
            'description': article.description,
            'content': article.content,
            'created_at': article.created_at,
            'category_ids': [int(cat_id) for cat_id in article.category_ids.split(',')],  # Convert string to a list of integers
            'preview_picture': article.preview_picture,
        }
        return jsonify(article_data)
    else:
        return jsonify({'message': 'Article not found'}), 404
# Route for get all articles
@articles_bp.route('', methods=['GET'])
def get_all_articles():
    articles = db.session.query(Article, Categorie_article).join(Categorie_article, Article.categorie_id == Categorie_article.id)
    if articles:
        article_data = []
        for article in articles:
            article_data.append({
                'id': article.Article.id,
                'title': article.Article.title,
                'author_id': article.Article.author_id,
                'description': article.Article.description,
                'content': article.Article.content,
                'created_at': article.Article.created_at,
                'categorie': article.Categorie_article.name
            })
        return jsonify(article_data)
    else:
        return jsonify({'message': 'Articles not found'}), 404

# ------------------------------------POST------------------------------------#

# Route for get all articles
@articles_bp.route('', methods=['POST'])
def create_article():
    new_article_data = request.json
    new_article = Article(
        title=new_article_data['title'],
        author_id=new_article_data['author_id'],
        description=new_article_data['description'],
        content=new_article_data['content']
    )
    db.session.add(new_article)
    db.session.commit()
    return jsonify({'message': 'Article created successfully'}), 201

# ------------------------------------PUT------------------------------------#

# Route for update a article by its ID
@articles_bp.route('/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    updated_article_data = request.json
    article = Article.query.get(article_id)

    if article:
        article.title = updated_article_data['title']
        article.description = updated_article_data['description']
        article.content = updated_article_data['content']
        db.session.commit()
        return jsonify({'message': 'Article updated successfully'})
    else:
        return jsonify({'message': 'Article not found'}), 404

# ------------------------------------DELETE------------------------------------#

# Route for delete article by id
@articles_bp.route('/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    article = Article.query.get(article_id)

    if article:
        db.session.delete(article)
        db.session.commit()
        return jsonify({'message': 'Article deleted successfully'})
    else:
        return jsonify({'message': 'Article not found'}), 404
