from app.utils import check_api_key

def before_request():
    result = check_api_key()
    if result:
        return result