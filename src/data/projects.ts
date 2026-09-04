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
  {
    slug: "studio-knowledge-base-rag",
    title: "Organization-Level RAG over Data-Engineering Knowledge",
    category: "RAG Architecture · Databricks · Organization Level",
    summary:
      "A Databricks-native Retrieval-Augmented Generation system over internal data-engineering documents — field-mapping workbooks, data dictionaries, and design specs. It answers questions three ways (exact SQL lookups, hybrid vector retrieval, and LLM-drafted cited answers), fed by a governed ingestion pipeline with ~27 hard quality gates that block a bad build before it ever reaches answers.",
    fullDescription:
      "Studio Knowledge Base is a Databricks-native RAG system deployed at organization level over internal data-engineering documents: field-mapping workbooks, data dictionaries, and design/spec documents. Files are uploaded to a Unity Catalog Volume corpus where the folder path is a contract — it assigns client IDs, document kind (prose / mapping / dictionary), and sharing class, and doc_kind doubles as a processing instruction (only dictionary documents feed the structured dictionary table). A Lakebase (managed Postgres) registry tracks each upload through a Uploaded → Processing → Completed | Failed | Missing-file lifecycle; because only serverless compute reaches Lakebase, the pipeline job brackets its classic-compute stages with serverless status tasks.\n\nThe ingestion run is deliberately restricted: it parses exactly the selected files (selection is an instruction — selected files parse unconditionally, even if byte-identical), leaves untouched documents in place via per-document DELETE+APPEND on Delta (never full-table rewrites), withdraws rows for files deleted from the Volume, and refuses cross-run duplicate content (same hash at a new path is quarantined while the incumbent keeps its identity). The Databricks job runs git-sourced notebooks as a task graph: parse documents (docling → typed elements and table cells) and spreadsheets (per-sheet archetype classification) → normalize into a canonical schema (source→silver→gold field mappings, a core+ext data dictionary, canonical sections, and precomputed rollup summaries) → parent/child chunking with content-derived chunk IDs and a provenance prefix on every chunk.\n\nBefore anything reaches answers, a checks stage enforces ~27 hard gates and measured baselines — parse fidelity, furniture leaks, chunk size/uniqueness/reproducibility, sheet coverage, mapping-chunk contracts, PHI/identifier patterns, and landing/quarantine reconciliation — so any unexpected gate failure fails the run before the vector index syncs. A vocabulary stage extracts ~18k corpus terms with size-independent rarity and bare forms of qualified names, then the sync stage triggers the Vector Search Delta Sync and waits. The index (chunks_index) is a Databricks Vector Search Delta Sync index over the gold chunks with change-data-feed, using Databricks-managed BGE-large embeddings (1024 dims) applied to both chunk text at sync and query text at query time.\n\nQuestions are answered by three composed paths. Cheap deterministic intent routing classifies lookup / aggregate / retrieval and extracts identifiers — aggregate questions are never answered from top-k because counting from a handful of chunks produces confident wrong answers. The exact path resolves prose names to identifiers via the vocabulary and runs plain parameterized SQL over the field-mapping and dictionary tables. The semantic path always runs one SQL statement on a serverless warehouse: hybrid vector search → LEFT JOIN the parent section for surrounding context → ai_query drafts an evidence-only answer with per-claim citations (title + page), emitting a NOT_IN_CORPUS sentinel when nothing supports an answer. Two front ends consume it: a Databricks App (Streamlit) and a Genie space exposing UC functions (ask_knowledge runs all three paths in one call). Deterministic identity — same content yields the same chunk IDs — keeps citations stable and re-embedding minimal, and no PHI or content ever appears in logs or quarantine reasons.",
    tags: [
      "RAG",
      "Databricks",
      "Vector Search",
      "Unity Catalog",
      "Lakebase (Postgres)",
      "Delta Lake",
      "docling",
      "BGE-large Embeddings",
      "ai_query / Gemini",
      "Genie",
      "Streamlit",
      "Python",
    ],
    color: "from-rose-500/15 to-pink-600/15",
    accentBorder: "hover:border-rose-500/40",
    accentText: "text-rose-400",
    stats: [
      { value: "3", label: "composed answer paths per question" },
      { value: "~27", label: "hard quality gates before index sync" },
      { value: "1024-dim", label: "BGE-large managed embeddings" },
    ],
    useCases: [
      {
        iconKey: "Database",
        title: "Contract-driven, governed intake",
        body: "The UC Volume folder path is the contract: it assigns client IDs, document kind, and sharing class, while a Lakebase registry tracks each file through its status lifecycle. Restricted runs parse only selected files, mirror deletions, and quarantine cross-run duplicate content instead of double-counting it.",
      },
      {
        iconKey: "ShieldCheck",
        title: "Quality gates guard every build",
        body: "~27 hard gates plus measured baselines (parse fidelity, furniture leaks, chunk reproducibility, mapping-chunk contracts, PHI/identifier patterns, landing/quarantine reconciliation) run before the index syncs — a bad build never reaches answers, and sensitive values never leak into logs or indexed text.",
      },
      {
        iconKey: "FileSearch",
        title: "Three-way question answering",
        body: "Exact parameterized SQL for identifier lookups, hybrid vector retrieval for semantic questions, and an LLM-drafted answer with per-claim citations (title + page). The prompt is evidence-only and returns a NOT_IN_CORPUS sentinel rather than guessing when nothing supports an answer.",
      },
      {
        iconKey: "BarChart3",
        title: "Aggregate-safe routing",
        body: "Deterministic intent routing sends counting and aggregation questions to SQL rather than top-k retrieval, because counting from a handful of retrieved chunks produced confident wrong answers. Rollup summaries are precomputed as their own chunks so retrieval can surface aggregates it cannot otherwise enumerate.",
      },
    ],
    techStack: [
      "Databricks — Unity Catalog, UC Volumes, Vector Search, serverless SQL warehouses",
      "Lakebase (managed Postgres) source-document registry with a status lifecycle",
      "Delta Lake — per-document DELETE+APPEND, change-data-feed Delta Sync index",
      "docling — PDF/DOCX/PPTX → typed elements and table cells",
      "Databricks-managed embeddings — bge_large_en_v1_5 (1024 dims), same model at sync and query",
      "ai_query with databricks-gemini-3-5-flash for evidence-only cited answers",
      "Databricks Apps (Streamlit) front end + Genie space UC functions (ask_knowledge, lookup_*, resolve_identifier)",
      "Python — studio_hub intent routing and vocabulary-based identifier resolution",
    ],
    implementation: [
      {
        step: "01",
        title: "Governed intake & registry",
        description:
          "Files land in a UC Volume corpus whose path encodes client IDs, doc_kind, and sharing class. A Lakebase registry tracks Uploaded → Processing → Completed | Failed | Missing-file; the job brackets classic-compute stages with serverless status tasks (mark_processing / mark_completed / mark_failed) because only serverless compute reaches Lakebase.",
      },
      {
        step: "02",
        title: "Parse — documents & spreadsheets",
        description:
          "docling turns PDF/DOCX/PPTX into typed elements and table cells, flagging headers/footers as furniture excluded from canonical text. Spreadsheets are classified per sheet (mapping / joins / reference / data_extract), with detected header rows, banner capture, and merged-cell fill-down; sample member-data sheets never reach the index.",
      },
      {
        step: "03",
        title: "Normalize to a canonical schema",
        description:
          "A data-driven alias registry translates each workbook's spellings into one canonical schema: source→silver→gold field mappings with audit columns, a core+ext data dictionary (extracted from dictionary documents), canonical markdown sections, and rendered entity groups including precomputed rollup summaries. Mapping sheets that yield zero canonical rows fall back to rendered text.",
      },
      {
        step: "04",
        title: "Chunk — parent/child with stable identity",
        description:
          "Sections become parents; retrieval units are child chunks capped at 2800 chars, each opening with a provenance prefix (title | section path | provenance). chunk_id is content-derived (doc_id + section path + body + occurrence), so identical content re-mints identical IDs across rebuilds — keeping citations stable and re-embedding minimal.",
      },
      {
        step: "05",
        title: "Quality gates, vocabulary & index sync",
        description:
          "~27 hard gates and measured baselines run before any sync; an unexpected failure fails the run so a bad build never reaches answers. A vocabulary stage extracts ~18k terms with size-independent rarity and bare forms of qualified names, then the sync stage triggers the Vector Search Delta Sync (change data feed, BGE-large managed embeddings) and waits.",
      },
      {
        step: "06",
        title: "Three composed answer paths",
        description:
          "Intent routing (deterministic regexes) picks lookup / aggregate / retrieval. The exact path resolves prose names via the vocabulary and runs parameterized SQL over the mapping/dictionary tables. The semantic path runs one serverless SQL statement — hybrid vector_search → LEFT JOIN parent section → ai_query — returning an evidence-only answer with per-claim citations or a NOT_IN_CORPUS sentinel.",
      },
    ],
    limitation: {
      title: "Serverless scale-to-zero cold starts",
      body: "The Databricks-managed embedding endpoint (bge_large_en_v1_5) scales to zero when idle, so the first query after a quiet period can stall on a cold start while the serving endpoint spins back up. This is a known operational trade-off of managed serverless embeddings — periodic warm-up pings or a minimum-provisioned endpoint mitigate the latency at additional cost.",
    },
  },
  {
    slug: "data-engineering-agent-skills",
    title: "Enterprise Data-Engineering Skills for AI Agents",
    category: "Agent Skills · Cursor · Databricks Genie",
    summary:
      "A governed library of enterprise-grade agent skills that turn recurring data-engineering work into reliable, automatable task playbooks. The same skills drive agents across Cursor and Databricks Genie — covering data ingestion, validation, quality checks, complex-file parsing, interoperability / data-sufficiency checks, EDI parsing, and transformations.",
    fullDescription:
      "This project packages the hardest, most repetitive parts of data engineering into a library of enterprise-level agent skills — structured task playbooks that an AI agent can execute deterministically instead of improvising. Each skill encodes the standards, guardrails, and step-by-step procedure for one class of work, so an agent produces consistent, reviewable output whether it is ingesting a new feed, validating a schema, or parsing an EDI file.\n\nThe skills are surfaced to agents across multiple runtimes. In Cursor they guide code-writing and review workflows; in Databricks Genie they back natural-language operations over governed data, letting analysts trigger ingestion, validation, and transformation tasks in plain language. Because the same skill definitions drive every runtime, teams get one source of truth for how data-engineering automation should behave — no per-tool drift, no re-implementing the same prompt logic on each surface.\n\nBusiness value comes from standardization and safety. The library covers data ingestion, data validation, data quality checks, parsing of complex files, interoperability and data-sufficiency checks, EDI parsing, and data transformations. Skills are versioned and centrally governed, so a fix or policy change is authored once and rolled out everywhere. Quality gates and data-sufficiency checks are built into the playbooks themselves, so automation fails loudly on bad input rather than silently propagating it downstream.",
    tags: [
      "Agent Skills",
      "Task Automation",
      "Cursor",
      "Databricks Genie",
      "Data Ingestion",
      "Data Validation",
      "Data Quality",
      "EDI Parsing",
      "Interoperability",
      "Data Transformations",
      "Governance",
    ],
    color: "from-teal-500/15 to-cyan-600/15",
    accentBorder: "hover:border-teal-500/40",
    accentText: "text-teal-400",
    stats: [
      { value: "7", label: "enterprise skill packs" },
      { value: "2+", label: "agent runtimes (Cursor, Genie)" },
      { value: "1", label: "governed source of truth" },
    ],
    useCases: [
      {
        iconKey: "Database",
        title: "Data ingestion",
        body: "A playbook for onboarding new feeds — source discovery, landing-zone conventions, idempotent loads, and audit columns — so ingestion is repeatable, traceable, and safe to re-run.",
      },
      {
        iconKey: "ShieldCheck",
        title: "Data validation",
        body: "Schema, type, and constraint validation with explicit pass/fail gates that block malformed records from promoting past the landing layer.",
      },
      {
        iconKey: "BarChart3",
        title: "Data quality checks",
        body: "Standardized completeness, uniqueness, freshness, and referential-integrity checks with measured baselines and clear, actionable failure reporting.",
      },
      {
        iconKey: "FileSearch",
        title: "Parsing complex files",
        body: "Structured extraction from messy real-world files — nested spreadsheets, multi-section documents, irregular layouts — into typed, canonical records.",
      },
      {
        iconKey: "Layers",
        title: "Interoperability & data-sufficiency checks",
        body: "Interoperability rule checks plus data-sufficiency gating: confirm required fields and coverage exist before a downstream process is allowed to run.",
      },
      {
        iconKey: "GitBranch",
        title: "EDI parsing agents",
        body: "EDI / X12 parsing that decomposes transaction sets into structured, validated records for healthcare and B2B data exchange.",
      },
      {
        iconKey: "Workflow",
        title: "Data transformations",
        body: "Canonical transformation patterns — mapping, normalization, and derivations — expressed as reviewable, reusable steps rather than one-off scripts.",
      },
    ],
    implementation: [
      {
        step: "01",
        title: "Author skills as governed playbooks",
        description:
          "Each skill is a versioned definition encoding the standard, guardrails, and step-by-step procedure for one class of data-engineering work. Skills are reviewed once and stored centrally so behavior is consistent and auditable.",
      },
      {
        step: "02",
        title: "Publish to agent runtimes",
        description:
          "The same skill catalog is exposed to Cursor for code-writing and review workflows and to Databricks Genie for natural-language data operations, so every runtime executes identical, approved procedures.",
      },
      {
        step: "03",
        title: "Enforce quality & sufficiency gates",
        description:
          "Validation, data-quality, and data-sufficiency checks run inside the skills themselves. Automation halts on bad or incomplete input and reports the failing gate rather than propagating errors downstream.",
      },
      {
        step: "04",
        title: "Version, roll out, and track",
        description:
          "Fixes and policy changes are authored once and rolled out everywhere through versioned skill updates, giving teams change tracking and a single governed source of truth for agent-driven automation.",
      },
    ],
    techStack: [
      "Agent skills (structured task playbooks) consumed by Cursor and Databricks Genie",
      "Databricks Genie — natural-language data operations backed by governed skills",
      "Data ingestion, validation, and data-quality-check skill packs",
      "Complex-file parsing and EDI / X12 parsing skills",
      "Interoperability and data-sufficiency gating",
      "Canonical data-transformation patterns",
      "Central versioning & governance for one source of truth",
    ],
  },
  // ─── Add new AI Engineering projects above this line ─────────────────────────
];

// ─── Healthcare ───────────────────────────────────────────────────────────────

export const healthcareProjects: Project[] = [
  {
    slug: "hedis-quality-measures",
    title: "HEDIS Quality Measures Engine",
    category: "Healthcare · Quality Measures",
    summary:
      "Built calculation logic for HEDIS quality measures such as Breast Cancer Screening (BCS), Cervical Cancer Screening (CCS), and Colorectal Cancer Screening (COL) — covering eligible populations, denominators, numerators, and exclusions across payer claims and enrollment data.",
    fullDescription:
      "Implemented HEDIS (Healthcare Effectiveness Data and Information Set) quality measure calculations used by US health plans to report care quality to NCQA and CMS. Each measure follows the same anatomy — define the eligible population, apply continuous-enrollment rules, derive the denominator, subtract exclusions, and count numerator-compliant members — but the clinical logic differs per measure and per measurement year.\n\nExamples of measures implemented: Breast Cancer Screening (BCS) — women 50–74 with a mammogram in the past 27 months, excluding members with bilateral mastectomy; Cervical Cancer Screening (CCS) — women 21–64 screened with cytology every 3 years or hrHPV testing every 5 years, excluding hysterectomy with no residual cervix; Colorectal Cancer Screening (COL) — members 45–75 with FOBT, FIT-DNA, colonoscopy, or other qualifying screenings within their lookback windows, excluding colorectal cancer and total colectomy history.\n\nMeasure logic was driven by claims (CPT, HCPCS, ICD-10), lab results, and enrollment spans, with value-set mapping kept current per measurement-year specifications. Outputs fed compliance rates, member-level gap-in-care lists, and payer reporting downstream.",
    tags: [
      "HEDIS",
      "NCQA",
      "BCS / CCS / COL",
      "Value Sets",
      "ICD-10 / CPT / HCPCS",
      "Claims Data",
      "PySpark",
      "SQL",
    ],
    color: "from-emerald-500/15 to-teal-600/15",
    accentBorder: "hover:border-emerald-500/40",
    accentText: "text-emerald-400",
    implementation: [
      {
        step: "01",
        title: "Eligible Population & Continuous Enrollment",
        description:
          "Identify members meeting age, gender, and product-line criteria for each measure, then apply continuous-enrollment rules (e.g. enrolled during the measurement year with no more than one 45-day gap) using enrollment span data.",
      },
      {
        step: "02",
        title: "Denominator & Exclusions",
        description:
          "Derive the denominator from the eligible population and remove required exclusions — clinical exclusions (bilateral mastectomy for BCS, hysterectomy for CCS, total colectomy for COL), hospice, and palliative-care members — identified through diagnosis, procedure, and place-of-service codes.",
      },
      {
        step: "03",
        title: "Numerator Compliance",
        description:
          "Scan claims and lab data for qualifying services within each measure's lookback window (27 months of mammography for BCS; 3-year cytology or 5-year hrHPV for CCS; per-modality windows for COL), mapping services through measurement-year value sets.",
      },
      {
        step: "04",
        title: "Rates & Gap-in-Care Outputs",
        description:
          "Compute compliance rates by plan, product line, and provider group, and publish member-level care-gap lists so outreach teams can close gaps before year-end reporting.",
      },
    ],
    useCases: [
      {
        iconKey: "BarChart3",
        title: "Plan-level quality reporting",
        body: "Measure rates roll up by plan and product line for NCQA/CMS reporting cycles, with year-over-year trend visibility.",
      },
      {
        iconKey: "FileSearch",
        title: "Member gap-in-care lists",
        body: "Non-compliant members surface with the specific missing service, powering outreach campaigns that close care gaps before the reporting deadline.",
      },
      {
        iconKey: "ShieldCheck",
        title: "Audit-ready measure logic",
        body: "Each rate traces back to explicit denominator, exclusion, and numerator populations, making measure results defensible during compliance audits.",
      },
      {
        iconKey: "Workflow",
        title: "Measurement-year updates",
        body: "Value-set and specification changes are isolated per measurement year, so annual HEDIS spec updates don't require rewriting measure logic.",
      },
    ],
  },
  {
    slug: "edi-file-processing",
    title: "EDI X12 File Processing",
    category: "Healthcare · EDI & Standards",
    summary:
      "Built parsers and pipelines for X12 EDI transaction sets — 834 enrollment, 820 premium payments, 837 claims, and more — converting loop/segment structures into clean, analytics-ready tables.",
    fullDescription:
      "Created parsing and ingestion pipelines for the X12 EDI transaction sets that move data between US payers, employers, and providers: 834 (benefit enrollment and maintenance), 820 (premium payments), 837 (professional, institutional, and dental claims), along with related transactions such as 835 remittance advice.\n\nEDI files are hierarchical loop/segment structures (ISA/GS envelopes, ST transactions, and nested loops like 2000A–2300) rather than flat records, so the parsers handled envelope validation, loop traversal, repeating segments, and situational elements before flattening transactions into normalized relational tables. Malformed files, unexpected segment ordering, and partner-specific companion-guide quirks were handled through validation layers that quarantined bad transactions instead of failing whole batches.\n\nBeyond EDI, the same ingestion framework standardized data arriving as XML, HL7, Parquet, CSV, JSON, and Excel — giving downstream analytics one consistent schema regardless of the source format a client or trading partner used.",
    tags: [
      "EDI X12",
      "834 / 820 / 837",
      "835 Remittance",
      "HL7",
      "XML / JSON / CSV",
      "Parquet",
      "Python",
      "PySpark",
    ],
    color: "from-teal-500/15 to-cyan-600/15",
    accentBorder: "hover:border-teal-500/40",
    accentText: "text-teal-400",
    stats: [
      { value: "834/820/837", label: "core X12 transaction sets parsed" },
      { value: "7+", label: "file formats standardized (EDI, HL7, XML, Parquet, CSV, JSON, Excel)" },
    ],
    implementation: [
      {
        step: "01",
        title: "Envelope Validation",
        description:
          "Validate ISA/IEA and GS/GE envelopes, control numbers, and ST/SE transaction counts before parsing. Files failing structural validation are quarantined with actionable error reports for trading partners.",
      },
      {
        step: "02",
        title: "Loop & Segment Parsing",
        description:
          "Traverse the hierarchical loop structure of each transaction set — subscriber and dependent loops in 834, claim/service-line loops (2300/2400) in 837 — resolving situational segments and repeating elements per implementation guide.",
      },
      {
        step: "03",
        title: "Normalization to Tables",
        description:
          "Flatten parsed transactions into normalized member, coverage, claim, and payment tables with full lineage back to the source file, interchange, and segment position for auditability.",
      },
      {
        step: "04",
        title: "Partner-Specific Handling",
        description:
          "Companion-guide variations per payer and trading partner are captured as configuration rather than code branches, so onboarding a new partner doesn't destabilize existing feeds.",
      },
    ],
  },
  {
    slug: "interoperability-standardization",
    title: "Interoperability & Data Standardization",
    category: "Healthcare · Interoperability",
    summary:
      "Data standardization and standard data model (SAM) development for interoperability programs — including requirements and gap analysis of existing payer data against the CMS-9115-F and CMS-0057-F interoperability rules.",
    fullDescription:
      "Worked on payer interoperability programs driven by the CMS Interoperability and Patient Access final rule (CMS-9115-F) and the Interoperability and Prior Authorization final rule (CMS-0057-F), which require payers to expose claims, clinical, and prior-authorization data through standards-based FHIR APIs.\n\nThe core of the work was data standardization: developing standard data models (SAMs) that map heterogeneous source data — claims, enrollment, provider, and clinical feeds arriving in every format from EDI to HL7 to flat files — into consistent, interoperable structures that downstream FHIR resources and analytics can rely on.\n\nA major component was interoperability requirements and gap analysis: taking what the regulations require, comparing it element-by-element against what actually exists in a payer's current data, and producing concrete remediation plans — which fields are missing, which need transformation or code-set mapping (ICD, CPT, LOINC, NDC), and which source systems must be onboarded to reach compliance.",
    tags: [
      "CMS-9115-F",
      "CMS-0057-F",
      "FHIR",
      "Standard Data Models (SAM)",
      "Gap Analysis",
      "Data Standardization",
      "Patient Access API",
      "Prior Authorization",
    ],
    color: "from-emerald-500/15 to-green-600/15",
    accentBorder: "hover:border-emerald-500/40",
    accentText: "text-emerald-400",
    implementation: [
      {
        step: "01",
        title: "Regulatory Requirements Mapping",
        description:
          "Break down CMS-9115-F (Patient Access API, provider directory) and CMS-0057-F (prior authorization APIs and timelines) into concrete data-element requirements per API and FHIR resource.",
      },
      {
        step: "02",
        title: "Gap Analysis Against Existing Data",
        description:
          "Compare required elements against the payer's actual source data — element by element — classifying each as available, transformable, or missing, and identifying the source systems needed to fill gaps.",
      },
      {
        step: "03",
        title: "Standard Data Model (SAM) Development",
        description:
          "Design and build standard data models that normalize claims, enrollment, provider, and clinical data into consistent structures, with code-set mapping (ICD-10, CPT, LOINC, NDC) applied at the model boundary.",
      },
      {
        step: "04",
        title: "Remediation & Compliance Roadmap",
        description:
          "Deliver prioritized remediation plans — transformations to build, feeds to onboard, mappings to maintain — so the payer reaches API compliance on regulatory timelines.",
      },
    ],
  },
  {
    slug: "payer-analytics-reporting",
    title: "Payer Analytics & Reporting",
    category: "Healthcare · Analytics",
    summary:
      "Built the analytics and reporting layer used by US health plans: member months, care-gap reports, insurance leakage, IBNR reserves, claims and provider reporting, provider performance, and high-cost member analyses.",
    fullDescription:
      "Developed the reporting suite that health-plan actuarial, network, and care-management teams run their business on. Member-month calculations — the denominator behind nearly every per-member-per-month (PMPM) metric — were derived from enrollment spans with retroactivity handling, and fed utilization, cost, and premium analyses.\n\nFinancial and actuarial reporting included IBNR (incurred but not reported) reserve reports built from claims-lag triangles, and insurance leakage reports quantifying spend that left the contracted network or missed negotiated rates. Clinical and network reporting covered care-gap reports (driven by quality-measure results), claims reports, provider rosters, and provider performance reports comparing cost and utilization against peer benchmarks.\n\nHigh-cost member reports stratified the population by spend and risk to surface the small share of members driving a disproportionate share of cost — the starting point for case-management intervention. This portfolio of reporting was delivered across engagements with 80+ US healthcare clients, including data from major payers such as Aetna, Anthem, and Blue Cross Blue Shield plans.",
    tags: [
      "Member Months",
      "PMPM",
      "IBNR",
      "Care Gaps",
      "Leakage Analysis",
      "Provider Performance",
      "High-Cost Members",
      "Claims Reporting",
    ],
    color: "from-green-500/15 to-emerald-600/15",
    accentBorder: "hover:border-green-500/40",
    accentText: "text-green-400",
    stats: [
      { value: "80+", label: "US healthcare clients served" },
      { value: "8", label: "report families delivered" },
      { value: "Aetna · Anthem · BCBS", label: "major payer data experience" },
    ],
    useCases: [
      {
        iconKey: "BarChart3",
        title: "Actuarial & financial reporting",
        body: "Member months, PMPM metrics, and IBNR reserve estimates from claims-lag triangles give actuarial teams the numbers behind pricing and reserving decisions.",
      },
      {
        iconKey: "FileSearch",
        title: "Care-gap & quality outreach",
        body: "Care-gap reports translate quality-measure results into actionable member lists for outreach and intervention programs.",
      },
      {
        iconKey: "Database",
        title: "Network & provider insight",
        body: "Leakage, provider, and provider-performance reports show where spend leaves the network and how providers compare on cost and utilization.",
      },
      {
        iconKey: "Cpu",
        title: "High-cost member management",
        body: "Spend and risk stratification surfaces the members driving disproportionate cost, prioritizing case-management resources where they matter most.",
      },
    ],
  },
  // ─── Add new Healthcare projects above this line ──────────────────────────────
];
