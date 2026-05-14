export type InsightType = "market" | "crm" | "usage";

export interface Insight {
  type: InsightType;
  title: string;
  summary: string;
  detail: string;
  source: string;
  date: string;
}

export interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface PastProduct {
  name: string;
  purchaseDate: string;
  annualRevenue: number;
  status: "active" | "declined" | "expired";
}

export interface Opportunity {
  id: string;
  company: string;
  industry: string;
  segment: "enterprise" | "mid-market";
  product: string;
  estimatedRevenue: number;
  probability: number;
  insightSummary: string;
  insights: Insight[];
  contacts: Contact[];
  pastProducts: PastProduct[];
  companyDescription: string;
  employeeCount: number;
  annualRevenue: string;
  location: string;
}

export const opportunities: Opportunity[] = [
  {
    id: "1",
    company: "АгроЗерноХолдинг",
    industry: "Агропром"
    segment: "enterprise",
    product: "Платформа предиктивной аналитики",
    estimatedRevenue: 12500000,
    probability: 78,
    insightSummary: "Рост потребления облачных ресурсов на 45% за квартал. Новые требования регулятора к отчётности.",
    insights: [
      {
        type: "usage",
        title: "Рост потребления облачных ресурсов",
        summary: "Потребление вычислительных мощностей выросло на 45% за Q3",
        detail: "Анализ данных биллинга показывает устойчивый рост потребления облачных сервисов клиента на 45% за последний квартал. Основной драйвер — масштабирование аналитических пайплайнов для обработки геологических данных. Текущая инфраструктура приближается к лимитам, что создаёт потребность в решении предиктивной аналитики для оптимизации нагрузки.",
        source: "Система мониторинга потребления",
        date: "2026-04-28",
      },
      {
        type: "market",
        title: "Новые требования ЦБ к отчётности",
        summary: "С 2027 года вступают новые стандарты ESG-отчётности",
        detail: "Центральный банк опубликовал проект новых требований к ESG-отчётности для крупных компаний, вступающих в силу с января 2027. Компаниям нефтегазового сектора потребуются инструменты предиктивной аналитики для моделирования углеродного следа и формирования отчётности в новом формате.",
        source: "Коммерсантъ, 15.04.2026",
        date: "2026-04-15",
      },
      {
        type: "crm",
        title: "Успешное внедрение Data Lake",
        summary: "В 2025 году клиент приобрёл и успешно внедрил Data Lake решение",
        detail: "Проект внедрения Data Lake был завершён в срок с положительными отзывами. Проектная команда клиента отметила необходимость дополнительных аналитических инструментов поверх собранных данных. Контактное лицо (Иванов А.С.) выражал интерес к решениям предиктивной аналитики на встрече 12.03.2026.",
        source: "CRM, заметки менеджера",
        date: "2026-03-12",
      },
    ],
    contacts: [
      { name: "Иванов Алексей Сергеевич", role: "CTO", phone: "+7 (495) 111-22-33", email: "ivanov@gpn.ru" },
      { name: "Петрова Марина Владимировна", role: "VP of Engineering", phone: "+7 (495) 111-22-34", email: "petrova@gpn.ru" },
      { name: "Козлов Дмитрий Иванович", role: "Head of Procurement", phone: "+7 (495) 111-22-35", email: "kozlov@gpn.ru" },
    ],
    pastProducts: [
      { name: "Cloud Data Lake", purchaseDate: "2025-03-15", annualRevenue: 8500000, status: "active" },
      { name: "Базовый мониторинг", purchaseDate: "2024-06-01", annualRevenue: 2100000, status: "active" },
      { name: "BI Dashboard Suite", purchaseDate: "2024-01-20", annualRevenue: 0, status: "declined" },
    ],
    companyDescription: "Крупнейший зерновой холдинг с фокусом на цифровую трансформацию. Активно инвестирует в технологические решения для оптимизации выращивания, хранения и переработки зерновых культур.",
    employeeCount: 78000,
    annualRevenue: "2.8 трлн ₽",
    location: "Краснодар",
  },
  {
    id: "2",
    company: "МолПром Север",
    industry: "Молочное производство",
    segment: "enterprise",
    product: "Платформа кибербезопасности",
    estimatedRevenue: 18700000,
    probability: 65,
    insightSummary: "Участились кибератаки на финсектор. Клиент расширяет команду ИБ.",
    insights: [
      {
        type: "market",
        title: "Волна кибератак на финсектор",
        summary: "НКЦКИ зафиксировал рост атак на 120% в Q1 2026",
        detail: "Национальный координационный центр по компьютерным инцидентам опубликовал отчёт о росте числа кибератак на финансовый сектор на 120% в первом квартале 2026 года. Основные векторы — supply chain атаки и фишинг с использованием ИИ. Крупные финтех-компании вынуждены пересматривать архитектуру безопасности.",
        source: "Отчёт НКЦКИ, апрель 2026",
        date: "2026-04-02",
      },
      {
        type: "crm",
        title: "Расширение команды ИБ",
        summary: "Клиент нанял 30+ специалистов по безопасности за квартал",
        detail: "По данным из открытых источников и информации от контактного лица, Сбер Технологии активно расширяет подразделение информационной безопасности. За последний квартал было нанято более 30 специалистов. Это указывает на стратегическое решение по усилению киберзащиты и готовность инвестировать в решения безопасности.",
        source: "CRM, LinkedIn мониторинг",
        date: "2026-04-20",
      },
    ],
    contacts: [
      { name: "Сидоров Павел Андреевич", role: "CISO", phone: "+7 (495) 222-33-44", email: "sidorov@sbertech.ru" },
      { name: "Волкова Елена Николаевна", role: "Director of IT", phone: "+7 (495) 222-33-45", email: "volkova@sbertech.ru" },
    ],
    pastProducts: [
      { name: "Облачная инфраструктура", purchaseDate: "2024-09-01", annualRevenue: 15200000, status: "active" },
      { name: "DevOps Toolkit", purchaseDate: "2025-01-15", annualRevenue: 4300000, status: "active" },
    ],
    companyDescription: "Один из ведущих производителей молочной продукции. Управляет сетью молочных ферм и перерабатывающих заводов в Северо-Западном регионе.",
    employeeCount: 12000,
    annualRevenue: "180 млрд ₽",
    location: "Москва",
  },
  {
    id: "3",
    company: "ТракторМаш Поволжье",
    industry: "Сельхозмашиностроение",
    segment: "enterprise",
    product: "IoT-платформа мониторинга",
    estimatedRevenue: 9200000,
    probability: 82,
    insightSummary: "Рост потребления API на 200%. Программа цифровизации производства до 2028 года.",
    insights: [
      {
        type: "usage",
        title: "Взрывной рост API-вызовов",
        summary: "Число API-вызовов к нашим сервисам выросло на 200%",
        detail: "Мониторинг показывает рост числа API-вызовов от клиента на 200% за два месяца. Основной рост приходится на endpoint'ы передачи телеметрических данных с производственного оборудования. Клиент явно развивает собственное IoT-решение и нуждается в промышленной платформе для масштабирования.",
        source: "API Gateway аналитика",
        date: "2026-04-30",
      },
      {
        type: "market",
        title: "Программа «Цифровой рудник 2028»",
        summary: "Норникель анонсировал инвестиции 45 млрд ₽ в цифровизацию",
        detail: "На дне инвестора компания объявила о программе цифровой трансформации производственных процессов с бюджетом 45 млрд рублей до 2028 года. Ключевые направления: IoT-мониторинг оборудования, предиктивное обслуживание, автоматизация логистики. Это создаёт окно возможностей для предложения IoT-платформы.",
        source: "День инвестора Норникель, 20.03.2026",
        date: "2026-03-20",
      },
      {
        type: "crm",
        title: "Запрос на пилотный проект",
        summary: "Контактное лицо запрашивало информацию о пилоте IoT",
        detail: "Технический директор Норникель Диджитал (Кузнецов М.А.) в переписке от 25.04 запрашивал условия пилотного проекта по IoT-мониторингу для одного из рудников. Просил подготовить предложение с учётом специфики подземных работ и отсутствия стабильного сетевого покрытия.",
        source: "CRM, переписка",
        date: "2026-04-25",
      },
    ],
    contacts: [
      { name: "Кузнецов Максим Александрович", role: "CTO", phone: "+7 (495) 333-44-55", email: "kuznetsov@nndigital.ru" },
      { name: "Белова Анастасия Игоревна", role: "Program Manager", phone: "+7 (495) 333-44-56", email: "belova@nndigital.ru" },
    ],
    pastProducts: [
      { name: "Cloud Compute Basic", purchaseDate: "2025-06-01", annualRevenue: 3800000, status: "active" },
      { name: "API Gateway Pro", purchaseDate: "2025-08-15", annualRevenue: 1900000, status: "active" },
      { name: "IoT Starter Kit", purchaseDate: "2025-11-01", annualRevenue: 500000, status: "expired" },
    ],
    companyDescription: "Производитель сельскохозяйственной техники: тракторов, комбайнов и навесного оборудования. Активно цифровизирует производственные процессы и продукцию.",
    employeeCount: 3500,
    annualRevenue: "25 млрд ₽",
    location: "Самара / Тольятти",
  },
  {
    id: "4",
    company: "ЧерноземАгро",
    industry: "Растениеводство",
    segment: "mid-market",
    product: "ERP-интеграция + аналитика",
    estimatedRevenue: 5400000,
    probability: 71,
    insightSummary: "Новый закон о маркировке продукции. Текущие системы клиента не справляются.",
    insights: [
      {
        type: "market",
        title: "Обязательная маркировка продукции",
        summary: "С 01.01.2027 вводится обязательная маркировка для молочной продукции",
        detail: "Минпромторг утвердил расширение обязательной маркировки на все категории молочной продукции с января 2027 года. Компании АПК необходимо интегрировать системы учёта с «Честный ЗНАК». Текущие ERP-системы РусАгро не поддерживают этот формат обмена данными.",
        source: "Минпромторг, постановление от 01.04.2026",
        date: "2026-04-01",
      },
      {
        type: "usage",
        title: "Снижение использования аналитического модуля",
        summary: "Использование BI-модуля снизилось на 60% за квартал",
        detail: "Данные показывают резкое снижение активности клиента в нашем BI-модуле. Вероятно, текущее решение перестало удовлетворять потребности в связи с ростом объёмов данных. Предложение интегрированного ERP+аналитика решения может закрыть эту потребность.",
        source: "Система мониторинга активности",
        date: "2026-04-22",
      },
    ],
    contacts: [
      { name: "Морозов Виктор Петрович", role: "CFO", phone: "+7 (495) 444-55-66", email: "morozov@rusagro.ru" },
      { name: "Соколова Ирина Алексеевна", role: "IT Director", phone: "+7 (495) 444-55-67", email: "sokolova@rusagro.ru" },
    ],
    pastProducts: [
      { name: "BI Analytics Basic", purchaseDate: "2024-03-01", annualRevenue: 2200000, status: "active" },
      { name: "ERP Connector", purchaseDate: "2025-05-01", annualRevenue: 0, status: "declined" },
    ],
    companyDescription: "Агрохолдинг полного цикла в Центральном Черноземье. Направления: растениеводство, животноводство, элеваторы и переработка сахарной свёклы.",
    employeeCount: 14000,
    annualRevenue: "210 млрд ₽",
    location: "Воронеж",
  },
  {
    id: "5",
    company: "МетКомбинат Урал",
    industry: "Металлургия",
    segment: "enterprise",
    product: "AI-платформа обработки данных",
    estimatedRevenue: 22100000,
    probability: 58,
    insightSummary: "Стратегия AI First объявлена на совете директоров. Потребление ML-сервисов растёт.",
    insights: [
      {
        type: "market",
        title: "Стратегия AI First",
        summary: "МегаФон объявил о переходе к стратегии AI First",
        detail: "На заседании совета директоров МегаФон объявил о новой стратегии, в рамках которой AI становится ключевым приоритетом развития. Бюджет на AI-инициативы увеличен в 3 раза. Компания ищет партнёров для построения AI-платформы корпоративного уровня.",
        source: "Ведомости, 10.04.2026",
        date: "2026-04-10",
      },
      {
        type: "usage",
        title: "Рост ML-workloads",
        summary: "Потребление ML-сервисов выросло на 180% за два месяца",
        detail: "Клиент интенсивно наращивает использование наших ML-сервисов: обучение моделей, inference API, хранение данных для ML-пайплайнов. Текущий тарифный план не оптимален для таких объёмов. Предложение выделенной AI-платформы может увеличить объём контракта в 4-5 раз.",
        source: "Биллинг, ML-сервисы",
        date: "2026-05-01",
      },
    ],
    contacts: [
      { name: "Николаев Артём Дмитриевич", role: "VP of Data Science", phone: "+7 (495) 555-66-77", email: "nikolaev@megafon.ru" },
      { name: "Громова Ольга Сергеевна", role: "Head of Procurement", phone: "+7 (495) 555-66-78", email: "gromova@megafon.ru" },
    ],
    pastProducts: [
      { name: "ML Inference API", purchaseDate: "2025-09-01", annualRevenue: 6800000, status: "active" },
      { name: "Data Storage Pro", purchaseDate: "2025-02-01", annualRevenue: 4100000, status: "active" },
      { name: "AI Training Cluster", purchaseDate: "2025-12-01", annualRevenue: 8500000, status: "active" },
    ],
    companyDescription: "Крупный металлургический комбинат полного цикла. Производит прокат, стальные трубы и продукцию для машиностроения и строительной отрасли.",
    employeeCount: 28000,
    annualRevenue: "420 млрд ₽",
    location: "Магнитогорск",
  },
];
