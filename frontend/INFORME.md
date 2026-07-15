# TRABAJO PRÁCTICO N° 2 · DESARROLLO DE SOFTWARE
## INFORME DE ARQUITECTURA Y COMPONENTES - NOVABANK

**Estudiante**: Tobias Benjamin Vitale  
**Fecha de Entrega**: Junio 2026  
**Tecnologías Principales**: React, Vite, React Context API, Tailwind CSS v4, Lucide Icons, React Router DOM

---

## 1. Resumen Ejecutivo

El presente informe detalla la reestructuración arquitectónica realizada sobre la plataforma bancaria simulada **NovaBank**. El objetivo principal del proyecto fue simplificar la base del código, eliminar redundancias y dependencias de hojas de estilo fragmentadas, y migrar a un flujo de datos robusto e idóneo para una defensa académica en la universidad.

La arquitectura de la aplicación se rediseñó para transicionar desde un flujo basado en eventos globales del DOM (`CustomEvents`) hacia una arquitectura pura de React basada en el patrón Provider/Context, complementada con Tailwind CSS v4 para una visualización premium unificada.

---

## 2. Arquitectura de Estado Global (`React Context API`)

Se implementó la capa de estado unificado en **`BankContext.jsx`**. Este componente envuelve la aplicación completa y expone tanto los datos globales (la "base de datos" local) como las funciones controladoras de negocio.

### Ventajas de esta implementación:
*   **Fuente única de verdad**: Se eliminaron las sincronizaciones manuales con variables globales y localStorage.
*   **Encapsulamiento**: Toda la lógica financiera (transferencias, altas, bajas, congelamientos de tarjetas) reside en un único proveedor, facilitando las pruebas.
*   **Actualizaciones Reactivas**: Cualquier cambio de saldo o estado se refleja inmediatamente en todos los componentes en pantalla sin recargar.

---

## 3. Mapa de Estructura de Directorios

El árbol de carpetas del proyecto quedó simplificado para asegurar legibilidad inmediata y un mantenimiento ágil:

```text
src/
├── assets/             # Logotipo y recursos gráficos estáticos
├── context/            # Capa del estado central (BankContext.jsx)
├── data/               # Base de datos simulada consolidada (mockData.js)
├── components/         # Componentes atómicos organizados por módulo
│   ├── Login/          # LoginForm, RegisterForm, RegisterPanel
│   └── Dashboard/      # Navbar, Sidebar, BalanceCard, CardSummary, ProfileModal, TransferModal, etc.
└── pages/              # Pantallas o vistas de rutas de la aplicación
```

---

## 4. Inventario Detallado de Páginas (Vistas de Rutas)

A continuación, se describen las vistas mapeadas mediante `react-router-dom` en la aplicación:

| Página / Ruta | Archivo de Origen | Descripción y Funcionalidad |
| :--- | :--- | :--- |
| **Inicio / Login** (`/` y `/login`) | `Login.jsx` | Portal de acceso principal del sitio. Alterna dinámicamente el inicio de sesión y el alta de clientes mediante estados internos en pantalla única. |
| **Dashboard Cliente** (`/cliente`) | `DashboardCliente.jsx` | Panel principal del cliente. Muestra el saldo consolidado, consumos del mes, accesos rápidos y últimos movimientos. |
| **Dashboard Administrador** (`/admin`) | `DashboardAdmin.jsx` | Panel del operador de sistemas. Permite autorizar usuarios pendientes y monitorizar logs críticos de seguridad. |
| **Gestión de Tarjetas** (`/tarjetas`) | `TarjetasCliente.jsx` | Centro de control para congelar, dar de baja o solicitar nuevas tarjetas de crédito o débito. |
| **Transferencias** (`/transferir`) | `Transferir.jsx` | Módulo de envíos inmediatos y gestión de agenda de contactos guardados. Delega el flujo de la transferencia al modal modular. |
| **Compra de Dólares** (`/comprar-dolar`) | `ComprarDolar.jsx` | Portal de compra de divisas con cotizaciones en tiempo real (Oficial, MEP y Cripto). |
| **Inversiones** (`/inversiones`) | `Inversiones.jsx` | Centro financiero para simular plazos fijos, suscribir fondos comunes y comprar títulos públicos. |

---

## 5. Detalle de Componentes Modulares

### 5.1. Módulo de Autenticación

#### `LoginForm.jsx`
Procesa la entrada del correo y la contraseña. Al enviar la información, invoca a la función `loginUser` provista por el Context. Incluye validaciones visuales básicas en caso de campos vacíos.

#### `RegisterForm.jsx`
Formulario estructurado de creación de cuenta. Captura Nombre Completo, Correo, Contraseña y DNI. Registra al usuario en la base de datos local con estado "Pendiente de aprobación" para simular el proceso de validación administrativa.

#### `RegisterPanel.jsx`
Componente auxiliar publicitario que acompaña los formularios de autenticación. Detalla los beneficios institucionales y controla las transiciones animadas de cambio de formulario.

---

### 5.2. Módulo de Dashboard e Interfaz de Usuario

#### `DashboardNavbar.jsx`
Barra superior de navegación fija. Aloja los elementos de marca (logo) y el perfil del usuario activo (siglas/avatar) junto al control del botón de menú lateral (hamburguesa) para pantallas táctiles y móviles.

#### `Sidebar.jsx`
Panel de navegación lateral colapsable. Se adapta reactivamente al tipo de usuario registrado; muestra enlaces de cliente si ingresó un cliente, o enlaces de control si es un administrador del sistema.

#### `BalanceCard.jsx`
Tarjeta de presentación de fondos del cliente. Renderiza el saldo neto y las subcategorías (Ingresos, Gastos, Inversiones) aplicando colores contextuales basados en tokens de Tailwind CSS v4.

#### `QuickActions.jsx`
Módulo de accesos rápidos que mapea los destinos prioritarios del cliente (Transferir, Tarjetas, Dólar, Inversiones) mediante botones adaptables e íconos vectoriales.

#### `MovementsList.jsx`
Visualizador del historial de gastos y acreditaciones. Muestra un adelanto de los últimos 4 movimientos en la tarjeta principal. Proporciona una opción de "Ver todos" que despliega un modal scrollable con el historial completo de operaciones.

#### `InvestmentsList.jsx`
Mini-panel informativo que detalla los activos financieros del usuario en FCI, Plazos Fijos y Dólar MEP.

#### `CardSummary.jsx`
Renderizador dinámico de tarjetas bancarias. Posee controles para visualización protegida del número/CVV, estados lógicos para tarjetas congeladas (cambio de opacidad y sello de alerta) y permite solicitar nuevas tarjetas (con validaciones de tipo Débito o Crédito) y darlas de baja de forma interactiva.

#### `ProfileModal.jsx`
Popup interactivo con efecto de desenfoque de fondo. Permite al cliente editar sus datos básicos (Nombre, Correo, DNI y Alias) de forma segura en una sola pantalla, actualizando automáticamente el estado y recalculando las iniciales del perfil en la Navbar y Tarjetas.

#### `TransferModal.jsx`
Componente encapsulado del wizard de transferencia. Administra todos los pasos de la transacción: búsqueda del CBU/Alias, verificación de datos de destino, ingreso de monto, mensaje opcional, re-ingreso de contraseña de seguridad y confirmación de éxito.

#### `AdminMetricCard.jsx`
Tarjetas analíticas exclusivas para el panel de administración. Mapean usuarios totales en la plataforma, volumen operado diario y alertas pendientes.

#### `PendingApprovals.jsx`
Panel interactivo para administradores que permite dar de alta a nuevos clientes en la plataforma. Al hacer clic en "Aprobar", cambia el estado del cliente a "Cuenta activa".

#### `SystemLogs.jsx`
Visualizador de la consola de auditoría del sistema, útil para monitorear eventos técnicos y de seguridad.

---

## 6. Conclusiones de la Refactorización

El resultado final es un sistema de software robusto, limpio y 100% libre de código huérfano. Se han removido más de 5 archivos CSS pesados y más de 3 archivos JS obsoletos. NovaBank cumple ahora con las mejores prácticas en el desarrollo de SPA sobre React: flujo unidireccional de datos, desacoplamiento de la vista de los datos mockeados y renderizado estético e interactivo optimizado para cualquier resolución de pantalla.
