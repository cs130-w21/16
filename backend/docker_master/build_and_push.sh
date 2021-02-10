cd "$(dirname "$0")"
cp ../secrets.js .
DOCKER_BUILDKIT=1 docker build --ssh default -t brendonng/potluck:master .
docker push brendonng/potluck:master