CREATE DATABASE Distribuidora_RS;
USE Distribuidora_RS;

CREATE TABLE bitacoras (
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    transaccion VARCHAR(10) NOT NULL,
    usuario VARCHAR(40) NOT NULL,
    Host VARCHAR(40) DEFAULT NULL,
    fecha DATETIME NOT NULL,
    tabla VARCHAR(20) NOT NULL
);

create table Catalogo (
Categoria int primary key auto_increment,
ID_Producto int,
Descripcion varchar(100),
PrecioProducto double,
Imagen varchar(50)
);

create table Tiempo (
ID_Tiempo INT PRIMARY KEY auto_increment,
Fecha DATE,
Mes VARCHAR(20),
Año INT,
INDEX idx_fecha (Fecha)
);

CREATE TABLE Usuarios (
    usuario VARCHAR(20) PRIMARY KEY,
    contraseña VARCHAR(20)
);

CREATE TABLE Calificaciones (
    ID_Calificacion INT AUTO_INCREMENT PRIMARY KEY,
    Calificacion TINYINT NULL,
    Comentario TEXT NULL,
    ID_Producto INT NULL
);

CREATE TABLE Categorias (
    ID_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    NombreCategoria VARCHAR(40) NOT NULL
    Descripción varchar (40)
);

CREATE TABLE Cliente (
    ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Tipo_Cliente VARCHAR(50) NOT NULL
);

CREATE TABLE Compra_factura (
    ID_CompraFactura INT AUTO_INCREMENT PRIMARY KEY,
    N_Factura INT NULL,
    ID_Proveedores INT NULL,
    Fecha DATETIME NULL,
    Imagen LONGBLOB NULL,
    FOREIGN KEY (ID_Proveedores) REFERENCES Proveedores(ID_Proveedores) ON DELETE CASCADE
);

CREATE TABLE Detalle_venta_factura (
    ID_Detalle INT AUTO_INCREMENT PRIMARY KEY,
    Cantidad INT NOT NULL,
    NumeroFactura INT NULL,
    PrecioVenta DOUBLE NULL
);

CREATE TABLE DetalleCompraFactura (
    ID_Compra INT AUTO_INCREMENT PRIMARY KEY,
    Cantidad INT NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    ID_CompraFactura INT NULL,
    ID_Producto INT NULL
);

CREATE TABLE Producto (
    ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Stock INT NULL,
    ID_Categoria INT NULL,
    PrecioCompra DOUBLE NULL,
    PrecioVenta DOUBLE NULL,
    nombreProducto VARCHAR(30) NULL,
    Descripcion VARCHAR(60) NULL,
    UbicacionFotografia VARCHAR(160) NULL
);

CREATE TABLE Proveedores (
    ID_Proveedores INT AUTO_INCREMENT PRIMARY KEY,
    NombreProveedor VARCHAR(50) NOT NULL,
    Telefono VARCHAR(50) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    Direccion VARCHAR(150) NOT NULL
);

CREATE TABLE Venta_factura (
    NumeroFactura INT AUTO_INCREMENT PRIMARY KEY,
    ID_Cliente INT NULL,
    ID_Tiempo INT,
    ID_Producto INT NOT NULL
);
ALTER TABLE venta_factura DROP COLUMN Fecha;
ALTER TABLE `distribuidora_rs`.`venta_factura` 
ADD COLUMN `ID_Tiempo` INT NOT NULL AFTER `ID_Cliente`;
ALTER TABLE `distribuidora_rs`.`venta_factura` 
ADD COLUMN `ID_Producto` INT NOT NULL AFTER `ID_Tiempo`;


-- Insertando registros en la tabla usuarios
insert into Usuarios (usuario,contraseña)Values 
                     ('jose','jose123');

-- Insertando registros en la tabla Categorias
INSERT INTO Categorias (NombreCategoria) VALUES ('Electrónica'), ('Hogar'), ('Deportes');

-- Insertando registros en la tabla Cliente
INSERT INTO Cliente (Nombre, Apellido, Tipo_Cliente) VALUES
('Juan', 'Perez', 'Regular' ),
('Ana', 'Gomez', 'Premium');

-- Insertando registros en la tabla Producto
INSERT INTO Producto (Stock, ID_Categoria, PrecioCompra, PrecioVenta, nombreProducto, Descripcion, UbicacionFotografia) VALUES
(50, 1, 100.00, 150.00, 'Televisor 50"', 'Televisor 4K UHD', 'imagenes/tv50.jpg'),
(20, 2, 30.00, 50.00, 'Lámpara LED', 'Lámpara de escritorio LED', 'imagenes/lampara.jpg');

-- Insertando registros en la tabla Proveedores
INSERT INTO Proveedores (NombreProveedor, Telefono, Correo, Direccion) VALUES
('Tech Supply', '123456789', 'contact@techsupply.com', 'Calle 123, Ciudad'),
('Hogar Express', '987654321', 'info@hogarexpress.com', 'Avenida 456, Ciudad');

-- Insertando registros en la tabla Compra_factura
INSERT INTO Compra_factura (N_Factura, ID_Proveedores, Fecha) VALUES
(1001, 1, '2024-03-10'),
(1002, 2, '2024-03-11');

-- Insertando registros en la tabla Venta_factura
INSERT INTO Venta_factura (ID_Cliente, Fecha) VALUES
(1, '2024-03-15'),
(2, '2024-03-16');


-- Relaciones entre tablas
ALTER TABLE venta_factura
ADD CONSTRAINT FK_Venta_factura_Cliente
FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente);  -- clientet y venta factura 

ALTER TABLE detalle_venta_factura
ADD CONSTRAINT FKñ_Detalle_Venta_Venta_factura
FOREIGN KEY (NumeroFactura) REFERENCES Venta_factura(NumeroFactura); 

ALTER TABLE Producto
ADD CONSTRAINT FK_Categoria_Producto
FOREIGN KEY (ID_Categoria) REFERENCES Categorias(ID_Categoria); 

ALTER TABLE detalle_venta_factura
ADD CONSTRAINT FK_Producto_Detallecomprafactura 
FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto);

ALTER TABLE detallecomprafactura
ADD CONSTRAINT FK_Categoria_Compra
FOREIGN KEY (ID_CompraFactura) REFERENCES Compra_factura(ID_CompraFactura);

ALTER TABLE compra_factura
ADD CONSTRAINT FK_proveedores_compra
FOREIGN KEY (ID_Proveedores) REFERENCES Proveedores(ID_Proveedores);

ALTER TABLE producto
ADD CONSTRAINT FK_proveedores_categoria
FOREIGN KEY (ID_Categoria) REFERENCES categorias(ID_Categoria);





