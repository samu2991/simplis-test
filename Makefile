DOCKER_NETWORK?=simplis-test
DOCKER_COMPOSE?=docker compose

build: ## Build containers
	eval "$(ssh-agent)"
	docker network ls --format={{.Name}} | grep -E ^$(DOCKER_NETWORK)$ || docker network create $(DOCKER_NETWORK)
	DOCKER_BUILDKIT=1 $(DOCKER_COMPOSE) build

start: ## Start containers
	$(DOCKER_COMPOSE) up -d

stop: ## Stop containers
	$(DOCKER_COMPOSE) stop

restart: ## Restart containers
	$(DOCKER_COMPOSE) restart