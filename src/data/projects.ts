// ─── Shared project data ─────────────────────────────────────────────────────
// Used by both listing pages (summary) and detail pages (full).
// Icons are stored as string keys; components map them to lucide imports.

export type IconKey =
  | "FileSearch"
  | "Cpu"
  | "GitBranch"
  | "Layers"
  | "Database"
  | "BarChart3"
  | "ShieldCheck"
  | "Workflow";

export interface UseCase {
  iconKey: IconKey;
  title: string;
  body: string;
}

export interface ImplementationStep {
  step: string;
  title: string;
  description: string;
}

export interface Artifact {
  file: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Limitation {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  /** 2–3 sentences shown on the listing/card page */
  summary: string;
  /** Paragraphs shown on the detail page */
  fullDescription: string;
  tags: string[];
  /** Tailwind gradient classes for hover card bg */
  color: string;
  /** Tailwind border hover class */
  accentBorder: string;
  /** Tailwind text colour for accent labels */
  accentText: string;
  /** External URL (undefined = internal only) */
  externalUrl?: string;
  stats?: Stat[];
  useCases?: UseCase[];
  implementation?: ImplementationStep[];
  artifacts?: Artifact[];
  limitation?: Limitation;
  /** Detail page: technology labels */
  techStack?: string[];
  /** Detail page: MCP tools / resources / prompts */
  mcpTools?: { name: string; description: string }[];
}

// ─── Data Engineering ─────────────────────────────────────────────────────────

export const dataEngineeringProjects: Project[] = [
  {
    slug: "healthcare-data-standardization",
    title: "Healthcare Data Standardization",
    category: "Data Engineering · Abacus Insights",
    summary:
      "Large-scale batch pipelines on Databricks + AWS to standardize US healthcare datasets across multiple payers using Medallion architecture with Delta Lake and Snowflake.",
    fullDescription:
      "Designed and maintained large-scale batch data pipelines in Databricks on AWS to standardize US healthcare datasets received from multiple payers. Data arrived in heterogeneous formats (HL7, X12 837/835, flat files) and required extensive cleaning, normalization, and schema enforcement before it could be used for analytics.\n\nImplemented Medallion architecture (Bronze / Silver / Gold) with Delta Lake, including SCD Type-2 change tracking for member and provider records, data validation frameworks with Great Expectations, and automated quality reporting. Orchestrated jobs using AWS Glue and Apache Airflow with EventBridge triggers for near-real-time ingestion windows.\n\nPublished curated Gold tables to Snowflake for downstream analytics and reporting teams. Reduced data quality issues by 85% through layered validation and introduced a schema registry to prevent breaking changes from upstream feeds.",
    tags: [
      "Databricks",
      "AWS",
      "Delta Lake",
      "Medallion Architecture",
      "Snowflake",
      "Apache Airflow",
      "AWS Glue",
      "Great Expectations",
      "PySpark",
      "HL7 / X12",
    ],
    color: "from-cyan-500/15 to-blue-600/15",
    accentBorder: "hover:border-cyan-500/40",
    accentText: "text-cyan-400",
    stats: [
      { value: "500K+", label: "claims processed daily" },
      { value: "85%", label: "reduction in data quality issues" },
      { value: "3-tier", label: "Medallion (Bronze/Silver/Gold)" },
    ],
    implementation: [
      {
        step: "01",
        title: "Bronze Layer — Raw Ingest",
        description:
          "All source files land in S3 and are ingested as-is into Delta Lake Bronze tables with full audit columns (ingestion timestamp, source system, file hash). No transformations — raw fidelity preserved.",
      },
      {
        step: "02",
        title: "Silver Layer — Cleanse & Normalise",
        description:
          "PySpark jobs standardise member IDs, procedure/diagnosis codes (ICD-10, CPT, HCPCS), dates, and provider NPIs. SCD Type-2 handles slowly-changing dimensions. Great Expectations validation gates block bad data from promoting.",
      },
      {
        step: "03",
        title: "Gold Layer — Business Aggregates",
        description:
          "Business-level aggregates (member months, claims roll-ups, risk scores) are pre-computed and written as optimised Delta tables. Z-ordering on common filter keys reduces query scan times.",
      },
      {
        step: "04",
        title: "Snowflake Publishing & Orchestration",
        description:
          "Gold tables sync to Snowflake via Delta Sharing or COPY INTO. Airflow DAGs orchestrate the end-to-end pipeline; EventBridge triggers intra-day reloads when upstream S3 drops arrive.",
      },
    ],
  },
  {
    slug: "enterprise-data-warehouse",
    title: "Enterprise Data Warehouse",
    category: "Data Warehouse · Cedar Gate Technologies",
    summary:
      "AWS Redshift DW storing 10M+ healthcare records annually. Improved query performance by 30% and reduced reporting delays by 70% through distribution key design, materialised views, and automated Glue/Airflow pipelines.",
    fullDescription:
      "Developed an AWS Redshift data warehouse storing 10M+ healthcare records annually for Cedar Gate's value-based care analytics platform. The warehouse consolidated claims, eligibility, provider, and quality-measure data from multiple source systems into a unified star-schema model.\n\nImproved query performance by 30% through careful distribution key and sort key design, compound sort keys on high-cardinality filter columns, and creation of materialised views for frequently-queried aggregations. Automated ingestion pipelines with AWS Glue (ETL jobs), Apache Airflow (orchestration), and EventBridge-driven schedules that reduced downstream reporting delays by 70%.\n\nEngineered robust ETL pipelines processing 500K+ healthcare claims daily, developed data validation frameworks that reduced data quality issues by 85%, and contributed to SQL optimisation efforts and database performance tuning across the analytics team.",
    tags: [
      "AWS Redshift",
      "AWS Glue",
      "Apache Airflow",
      "EventBridge",
      "ETL",
      "Star Schema",
      "Python",
      "SQL",
    ],
    color: "from-blue-500/15 to-indigo-600/15",
    accentBorder: "hover:border-blue-500/40",
    accentText: "text-blue-400",
    stats: [
      { value: "10M+", label: "records stored annually" },
      { value: "30%", label: "query performance improvement" },
      { value: "70%", label: "reduction in reporting delays" },
    ],
    implementation: [
      {
        step: "01",
        title: "Schema Design — Star Model",
        description:
          "Fact tables for claims, encounters, and quality measures with conformed dimensions for members, providers, dates, and diagnosis/procedure codes. Distribution keys chosen to co-locate fact-to-dimension joins on the same compute node.",
      },
      {
        step: "02",
        title: "ETL Pipeline — AWS Glue",
        description:
          "Glue jobs handle extraction from operational MySQL/Postgres databases, S3 landing zones, and third-party FTP feeds. Transformation logic applies business rules (HEDIS measure logic, risk stratification) before loading.",
      },
      {
        step: "03",
        title: "Orchestration — Airflow + EventBridge",
        description:
          "Airflow DAGs manage nightly full-refresh and intra-day incremental loads. EventBridge rules trigger ad-hoc Glue job runs when source files arrive in S3, reducing latency for time-sensitive feeds.",
      },
      {
        step: "04",
        title: "Performance Optimisation",
        description:
          "Compound sort keys on date + member_id columns, materialised views for frequent aggregations, VACUUM / ANALYZE scheduled weekly, and WLM queue configuration to prioritise interactive vs. batch workloads.",
      },
    ],
  },
  // ─── Add new Data Engineering projects above this line ───────────────────────
];

// ─── AI Engineering ───────────────────────────────────────────────────────────

export const aiEngineeringProjects: Project[] = [
  {
    slug: "graphify",
    title: "Reduce AI Token Use in Large Codebases",
    category: "Open Source · AI Coding Assistant Skill",
    summary:
      "An open-source AI coding assistant skill that turns any folder of code, docs, papers, images, or videos into a queryable knowledge graph. Personally tested and validated — reduces token usage by ~50% in large codebases. Works in Claude Code, Cursor, Codex, Gemini CLI, and more.",
    fullDescription:
      "Graphify is an open-source AI coding assistant skill that reads your files, builds a knowledge graph, and gives you back structure you didn't know was there. Type /graphify in Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot CLI, or any supported assistant, and it extracts concepts, relationships, and design rationale from your entire codebase — letting your AI navigate by graph structure instead of grepping through every file.\n\nPersonally tested and validated on large codebases: graphify reduces token usage by approximately 50% compared to feeding raw files into your AI assistant. The savings compound — the first run builds the graph; every subsequent query reads the compact representation instead of re-scanning source. A SHA256 cache means re-runs only re-process changed files.\n\nFully multimodal — drop in code, PDFs, markdown, screenshots, diagrams, whiteboard photos, or video files. Graphify extracts concepts from all of them and merges them into one unified graph. 25 programming languages supported via tree-sitter AST parsing.",
    tags: [
      "Knowledge Graph",
      "AST / tree-sitter",
      "Leiden Clustering",
      "NetworkX",
      "Multi-modal",
      "Token Reduction",
      "MCP Server",
      "Python",
      "Claude / Cursor / Codex",
    ],
    color: "from-violet-500/15 to-fuchsia-600/15",
    accentBorder: "hover:border-violet-500/40",
    accentText: "text-violet-400",
    externalUrl: "https://github.com/amazingashis/graphify",
    stats: [
      { value: "~50%", label: "token reduction validated on large codebases" },
      { value: "25", label: "languages via tree-sitter AST" },
      { value: "3-pass", label: "extraction pipeline" },
    ],
    useCases: [
      {
        iconKey: "FileSearch",
        title: "Navigate large codebases",
        body: "Type /graphify . in your AI assistant. Instead of grepping hundreds of files, your assistant reads GRAPH_REPORT.md and navigates by community structure — god nodes, surprising cross-file connections, and suggested questions.",
      },
      {
        iconKey: "Cpu",
        title: "~50% token reduction in large codebases",
        body: "Personally tested and validated — graphify reduces token usage by approximately 50% in large codebases by letting your AI assistant query a compact knowledge graph instead of re-reading raw source files. Savings compound on every subsequent query.",
      },
      {
        iconKey: "GitBranch",
        title: "Cross-file call graph & lineage",
        body: "AST extraction via tree-sitter builds cross-file call graphs, import chains, class hierarchies, and docstring rationale for 25 languages — all deterministically, with no LLM needed for code.",
      },
      {
        iconKey: "Layers",
        title: "Multi-modal corpus",
        body: "Drop code, PDFs, markdown, screenshots, diagrams, whiteboard photos, or video files into one folder. Graphify extracts concepts from everything and merges them into a single unified graph with confidence-tagged edges.",
      },
    ],
    implementation: [
      {
        step: "01",
        title: "AST Pass — no LLM needed",
        description:
          "tree-sitter deterministically parses 25 languages and extracts classes, functions, imports, call graphs, docstrings, and rationale comments (# WHY:, # NOTE:, # HACK:). All structural edges are tagged EXTRACTED with confidence 1.0.",
      },
      {
        step: "02",
        title: "Media Transcription — local Whisper",
        description:
          "Video and audio files are transcribed locally with faster-whisper using a domain-aware prompt derived from corpus god nodes. Transcripts are SHA256-cached so re-runs are instant. Audio never leaves your machine.",
      },
      {
        step: "03",
        title: "Parallel Semantic Extraction",
        description:
          "Claude subagents run in parallel over docs, papers, and images to extract concepts, relationships, and design rationale. Every edge is tagged EXTRACTED (found directly), INFERRED (reasonable inference with confidence 0–1), or AMBIGUOUS.",
      },
      {
        step: "04",
        title: "Graph Build + Leiden Clustering",
        description:
          "Results merge into a NetworkX graph. Leiden community detection clusters nodes by edge density — no embeddings or vector DB required. Outputs: graph.html (interactive vis.js), graph.json (queryable), GRAPH_REPORT.md (god nodes, surprises, questions).",
      },
    ],
    artifacts: [
      {
        file: "graph.html",
        description: "Interactive vis.js graph — click nodes, filter by community, search by label. Open in any browser.",
      },
      {
        file: "GRAPH_REPORT.md",
        description: "God nodes, surprising cross-file connections (ranked by score), and 4–5 questions the graph is uniquely positioned to answer.",
      },
      {
        file: "graph.json",
        description: "Persistent queryable graph. Re-query weeks later via CLI (graphify query) or MCP server without re-reading source.",
      },
    ],
    limitation: {
      title: "Not practically useful for Data Engineering projects",
      body: "Validated through direct testing: Graphify is not practically useful for Data Engineering projects where data mappings are the core concern. It tracks code-level lineage — class hierarchies, function call chains, import graphs — using AST analysis, but it has no understanding of data flow (sources → transformations → sinks). In DE workflows, what matters is how data moves and transforms across systems, not how functions call each other. For that, dedicated data-lineage tools such as OpenLineage, Marquez, or Unity Catalog Lineage are the right fit.",
    },
  },
  {
    slug: "imagine-cup-2021",
    title: "Imagine Cup 2021",
    category: "World Finalist · Microsoft · Earth Category",
    summary:
      "AI-driven environmental sustainability solution that reached the World Finals of the Microsoft Imagine Cup (Earth Category), combining computer vision with real-time sensor data.",
    fullDescription:
      "Developed an AI-driven environmental sustainability solution for Microsoft's Imagine Cup 2021, reaching the World Finals in the Earth Category — one of the most competitive tracks of the global student technology competition.\n\nThe project combined computer vision models with real-time IoT sensor data to surface actionable environmental insights. The system monitored local air quality and pollution patterns, classified environmental hazards from image feeds, and generated alerts and recommendations for communities.\n\nBuilt on Microsoft Azure with Azure Cognitive Services for vision processing, Azure IoT Hub for sensor data ingestion, and Power BI for real-time dashboards. The solution was designed for low-cost deployment in communities with limited infrastructure.",
    tags: [
      "Machine Learning",
      "Computer Vision",
      "Microsoft Azure",
      "Azure IoT Hub",
      "Azure Cognitive Services",
      "Power BI",
      "Sustainability",
    ],
    color: "from-emerald-500/15 to-teal-600/15",
    accentBorder: "hover:border-emerald-500/40",
    accentText: "text-emerald-400",
    externalUrl: "https://aka.ms/EarthCategory",
    implementation: [
      {
        step: "01",
        title: "Environmental Sensor Network",
        description:
          "IoT sensors deployed to collect real-time air quality, temperature, and pollution data. Azure IoT Hub ingested and routed telemetry to downstream processing pipelines.",
      },
      {
        step: "02",
        title: "Computer Vision Classification",
        description:
          "Azure Cognitive Services Custom Vision model trained to classify environmental hazards from image feeds (smoke, pollution, waste). Integrated with the IoT data stream for correlated alerts.",
      },
      {
        step: "03",
        title: "Real-time Dashboard",
        description:
          "Power BI streaming dashboards visualised sensor data, model predictions, and trend analysis. Alerts triggered automated recommendations for local community action.",
      },
    ],
  },
  {
    slug: "skills-mcp-server",
    title: "Central AI Agent Hub with MCP for Enterprise-Scale Skill Deployment",
    category: "Remote MCP · Agent Infrastructure",
    summary:
      "A centrally managed MCP server that turns organizational AI skills into shared, versioned agent capabilities across teams and devices. It reduces duplicated prompt engineering, enforces consistent delivery standards, and gives a single deployment path for updates, tracking, and governance.",
    fullDescription:
      "This project solves a core enterprise AI operations problem: teams build useful skills and agent playbooks, but they remain scattered across local machines and become difficult to govern. By hosting those skills behind one MCP endpoint, organizations can distribute agent behavior from a central repository with clear version control, predictable rollout, and simpler onboarding.\n\nBusiness value comes from standardization and speed. Data engineering teams get reusable guided workflows (data engineering patterns, Databricks secrets practices, workflow builder logic, and Delta table operations) without each engineer reinventing prompts or setup. The same managed catalog can be consumed from multiple clients and devices, reducing drift between environments and improving delivery quality.\n\nThe platform model also supports maintainability at scale: new skills are added once, reviewed once, and deployed once. That creates better change tracking, safer updates, and easier auditability of what agent capabilities are available in production at any point in time.",
    tags: [
      "MCP",
      "Model Context Protocol",
      "TypeScript",
      "Node.js",
      "Express",
      "@modelcontextprotocol/sdk",
      "Docker",
      "Streamable HTTP",
      "SSE",
      "Cursor",
      "Claude",
      "Zod",
      "Remote MCP",
      "Render",
    ],
    color: "from-sky-500/15 to-cyan-600/15",
    accentBorder: "hover:border-sky-500/40",
    accentText: "text-sky-400",
    externalUrl: "https://github.com/amazingashis/mcp-deployment",
    stats: [
      { value: "1", label: "central skill catalog for teams and devices" },
      { value: "4", label: "data engineering skill packs managed centrally" },
      { value: "100%", label: "cross-device reuse through one MCP endpoint" },
    ],
    techStack: [
      "TypeScript / Node.js 20+",
      "@modelcontextprotocol/sdk (McpServer, StreamableHTTPServerTransport, SSEServerTransport, StdioServerTransport)",
      "Express (createMcpExpressApp)",
      "Zod (tool input schemas)",
      "Docker & docker-compose",
      "Bearer auth + timing-safe compare",
      "HTTPS termination at reverse proxy (Render, nginx, etc.)",
    ],
    mcpTools: [
      {
        name: "data-engineering",
        description: "Centralized skill guidance for data engineering agent workflows and review patterns.",
      },
      {
        name: "databricks secrets",
        description: "Operational practices for Databricks secret handling and safe configuration patterns.",
      },
      {
        name: "databricks workflow builder",
        description: "Reusable approach for composing Databricks task graphs and workflow definitions.",
      },
      {
        name: "delta table operations",
        description: "Consistent playbook for Delta table lifecycle operations, migrations, and reliability checks.",
      },
    ],
    useCases: [
      {
        iconKey: "Workflow",
        title: "Data engineering standards available on every device",
        body: "Deploy once and consume from multiple laptops and AI clients, so every engineer uses the same approved data engineering skills instead of maintaining local copies.",
      },
      {
        iconKey: "Layers",
        title: "Reusable Databricks and Delta playbooks",
        body: "Databricks secrets, workflow builder, and Delta table operation skills remain centrally versioned and reusable across projects, reducing repeated setup and inconsistent implementations.",
      },
      {
        iconKey: "ShieldCheck",
        title: "Governed agent rollout with version control",
        body: "A central MCP-managed skill repository enables controlled updates, team-wide rollouts, and traceable changes to agent behavior, improving governance in larger organizations.",
      },
      {
        iconKey: "Cpu",
        title: "Faster agent deployment lifecycle",
        body: "New or updated data engineering skills can be published once and immediately consumed across environments, cutting time-to-adoption for internal AI agents.",
      },
    ],
    implementation: [
      {
        step: "01",
        title: "SkillsRegistry & MCP server",
        description:
          "Walks SKILLS_ROOT recursively for SKILL.md; builds stable ids (POSIX-relative paths); extracts title/description teaser for listings. create-server.ts wires McpServer with registerResource (URI template), registerTool, registerPrompt.",
      },
      {
        step: "02",
        title: "HTTP transports",
        description:
          "createMcpExpressApp() applies host validation when allowedHosts are set. POST /mcp and POST /sse run stateless StreamableHTTPServerTransport per request—compatible with Cursor’s POST-to-/sse probe. GET /sse opens SSE sessions; POST /messages routes JSON-RPC posts by session id.",
      },
      {
        step: "03",
        title: "Auth & compatibility",
        description:
          "Bearer middleware accepts Bearer <token> or a bare single token for misconfigured clients; constant-time equality vs MCP_AUTH_TOKEN. Stub POST /register returns JSON when clients attempt OAuth fallback after 401.",
      },
      {
        step: "04",
        title: "Ship & observe",
        description:
          "Multi-stage Dockerfile (Alpine, non-root user), Compose for local parity, HOSTING_AND_CURSOR.md / DEPLOYMENT.md for Render env vars (MCP_TRANSPORT, HOST, MCP_ALLOWED_HOSTS, MCP_AUTH_TOKEN, SKILLS_ROOT).",
      },
    ],
  },
  // ─── Add new AI Engineering projects above this line ─────────────────────────
];
