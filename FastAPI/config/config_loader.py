import yaml

def load_config():
    with open('config/config.yaml', 'r') as file:
        return yaml.safe_load(file)
    

config = load_config()
API_KEY = config['riot_api_key']
