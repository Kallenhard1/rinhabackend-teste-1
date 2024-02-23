CREATE TABLE IF NOT EXISTS pessoas (
    id VARCHAR(36),
    apelido VARCHAR(32) CONSTRAINT id_pk PRIMARY KEY,
    nome VARCHAR(100),
    nascimento CHAR(10),
    stack VARCHAR(1024),
    busca_trgm TEXT GENERATED ALWAYS AS (
        LOWER(nome || apelido || stack)
    ) stored
);

CREATE EXTENSION PG_TRGM;
CREATE INDEX CONCURRENTLY IF NOT EXISTS IDX_PESSOAS_BUSCA_TGRM ON pessoas USING GIST (busca_trgm GIST_TRGM_OPS(SIGLEN=64));