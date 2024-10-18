from azure.storage.blob import BlobServiceClient
from datetime import datetime

def upload_file (file) -> str:
    AZURE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=armazenamentoeasyrequest;AccountKey=IvIdXT7wftf4pYIfWteKp3w5R7CBjkoXFr1f0JZQtw0pTms03Rf4R9niIqEAJ3WGFqvLD5/voh7i+AStErFB3Q==;EndpointSuffix=core.windows.net"
    CONTAINER_NAME = "fotos"
    LINK_AZURE = "https://armazenamentoeasyrequest.blob.core.windows.net/"

    blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)

    if file.filename == '':
        return ""
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    file.filename = f"{timestamp}_{file.filename}"

    # Upload para o Azure Blob Storage
    try:
        blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=file.filename)

        blob_client.upload_blob(file, overwrite=True)
        
        return f"{LINK_AZURE}{CONTAINER_NAME}/{file.filename}"
    except:
        return ""