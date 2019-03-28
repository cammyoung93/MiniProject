## Brewery Example

This is a Flask app using a breweries API that does not require authentication.
It provides the user access to information about various breweries in the U.S.
It allows the user to enter the type of brewery (e.g. micro) as a parameter, returning information about breweries which fit the parameter type


## Building Your Own Image
You can use the images already pre-defined in the kubernetes manifest files or you can use the below to create your own images and use them:

Replace the realbtotharye with your Dockerhub repository

```
docker build -t gcr.io/${PROJECT_ID}/hello-app:v1 .
docker push gcr.io/${PROJECT_ID}/hello-app:v1

docker build -t realbtotharye/flask-kubernetes-redis flask-redis/
docker push realbtotharye/flask-kubernetes-redis
```

### Create Cluster
```
gcloud container clusters create hello-cluster --num-nodes=2
gcloud services enable container.googleapis.com
```

### Check cluster is created 
```
gcloud compute instances list
```

### Deploy app listening on port 8080
```
kubectl run hello-web --image=gcr.io/${PROJECT_ID}/hello-app:v1 --port 8080
```

### Delete Deployment
```
kubectl delete deployment hello-web
```

### Build and deploy database in Kubernetes (Pull image)
```
docker pull cassandra:latest
```

### Create Cassandra instance in Docker and check that it's running correctly
```
docker run --name cassandra-test -d cassandra:latest

docker ps
```

## Get Dataset from Github
```
wget -O Brewery_Table.csv http://tinyurl.com/y2bfobc6
```

## Copy data into container directory
```
docker cp Brewery_Table.csv cassandra-test:/home/Brewery_Table.csv
```

## Activate CQL shell in GCP
```
docker exec -it cassandra-test cqlsh
```

## Create Keyspace Brewery
```
CREATE KEYSPACE brewery WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};
```

## Create table Breweries
```
CREATE TABLE brewery.breweries (Brewery text, BreweryID text PRIMARY KEY, State text, Type text);
```

## Copy data from csv into Database
```
COPY brewery.breweries(Brewery,BreweryID,State,Type) FROM '/home/Brewery_Table.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

## Test data
```
select * from brewery.breweries;
```

## Create 3 node cluster named Cassandra
```
gcloud container clusters create cassandra --num-nodes=3 --machine-type "n1-standard-2"
```

## Get files for peer discovery, cassandra service, and replication controller
```
wget -O cassandra-peer-service.yml http://tinyurl.com/yyxnephy
wget -O cassandra-service.yml http://tinyurl.com/y65czz8e
wget -O cassandra-replication-controller.yml http://tinyurl.com/y2crfsl8
```

## Create components
```
kubectl create -f cassandra-peer-service.yml
kubectl create -f cassandra-service.yml
kubectl create -f cassandra-replication-controller.yml
```

## Check that pod is running
```
kubectl get pods -l name=cassandra
```

## Scale up nodes via replication controller
```
kubectl scale rc cassandra --replicas=2
```

## Pick container and check that ring is formed
```
kubectl exec -it cassandra-vw6wk  -- nodetool status
```

## Copy data from previous part into same container
```
kubectl cp Brewery_Table.csv cassandra-vw6wk:/Brewery_Table.csv
```

## Run CQL in container
```
kubectl exec -it cassandra-vw6wk cqlsh
```

## Create Keyspace in container
```
CREATE KEYSPACE brewery WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 2};
ALTER KEYSPACE brewery WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};
```

#Create table in container#
```
CREATE TABLE brewery.breweries (Brewery text, BreweryID text PRIMARY KEY, State text, Type text);
```

## Get data from previous section
```
COPY brewery.breweries(Brewery,BreweryID,State,Type) FROM 'Brewery_Table.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

## Clean up
```
kubectl delete --all replicationcontroller
kubectl delete --all services
```





