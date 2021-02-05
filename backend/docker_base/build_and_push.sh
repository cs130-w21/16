cd "$(dirname "$0")"
cp ../secrets.js .
DOCKER_BUILDKIT=1 docker build --ssh default -t brendonng/potluck:base .
docker push brendonng/potluck:base