CREATE DATABASE IF NOT EXISTS company_db;

USE company_db;

-- Remove usuários existentes
DROP USER IF EXISTS 'app_user' @'%';

DROP USER IF EXISTS 'app_user' @'localhost';

-- Cria o usuário da aplicação com acesso de qualquer host
CREATE USER 'app_user' @'%' IDENTIFIED
WITH
    mysql_native_password BY 'password';

CREATE USER 'app_user' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY 'password';

-- Concede privilégios ao usuário da aplicação
GRANT ALL PRIVILEGES ON company_db.* TO 'app_user' @'%';

GRANT ALL PRIVILEGES ON company_db.* TO 'app_user' @'localhost';

FLUSH PRIVILEGES;