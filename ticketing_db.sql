--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 17.0

-- Started on 2025-03-21 00:08:02 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 36250)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 36264)
-- Name: Complaint; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Complaint" (
    id text NOT NULL,
    customer_name text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    attachment text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Complaint" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 36280)
-- Name: Engineer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Engineer" (
    id text NOT NULL,
    name text NOT NULL,
    expertise text NOT NULL
);


ALTER TABLE public."Engineer" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 36272)
-- Name: Ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket" (
    id text NOT NULL,
    customer text,
    severity text NOT NULL,
    problem_time timestamp(3) without time zone,
    customer_info text,
    incident_description text,
    type text NOT NULL,
    "complaintId" text,
    "engineerId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status text DEFAULT 'Open'::text NOT NULL
);


ALTER TABLE public."Ticket" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 36251)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 3682 (class 0 OID 36264)
-- Dependencies: 210
-- Data for Name: Complaint; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Complaint" (id, customer_name, title, description, attachment, "createdAt", "updatedAt") FROM stdin;
181fff39-501d-473b-9b89-06ea33c8c253	John Doe	Laptop not turning on	Laptop won't power on, even when plugged in.	\N	2025-03-20 15:43:26.638	2025-03-20 15:43:26.638
8b1ed09c-3017-4019-a078-789411cfdd83	Jane Doe	WiFi connection issue	Internet is slow and frequently disconnecting.	\N	2025-03-20 15:43:26.644	2025-03-20 15:43:26.644
\.


--
-- TOC entry 3684 (class 0 OID 36280)
-- Dependencies: 212
-- Data for Name: Engineer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Engineer" (id, name, expertise) FROM stdin;
93b1b4d6-e518-4c49-a660-220126408966	Alice Johnson	Networking
a353dbab-9c39-40ef-bc69-bd21ff3d6c1d	Bob Smith	Hardware
\.


--
-- TOC entry 3683 (class 0 OID 36272)
-- Dependencies: 211
-- Data for Name: Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket" (id, customer, severity, problem_time, customer_info, incident_description, type, "complaintId", "engineerId", "createdAt", "updatedAt", status) FROM stdin;
\.


--
-- TOC entry 3681 (class 0 OID 36251)
-- Dependencies: 209
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f8e3ef1c-59d6-475d-bf47-cec8dde8b3bf	0de9c169056a37bb9515e827621ad72dc47709e3452d94827de89728dc254d58	2025-03-20 22:42:51.221584+07	20250320154251_init_with_complaints	\N	\N	2025-03-20 22:42:51.14151+07	1
ddb51a52-b1cb-4a4c-96e4-bf4d3c30e147	6300b924d76893dc727950f3e21ebb93f173f8ab5a9cd7bd88289686740c1066	2025-03-20 22:52:33.098627+07	20250320155233_make_customer_optional	\N	\N	2025-03-20 22:52:33.09691+07	1
94ba26d7-72d8-4753-b4a1-3938d0612a05	a1b6090439e560da5d03d1443edfb17e730bcf1771cfc92bf72ed78a79450530	2025-03-20 23:44:39.602191+07	20250320164439_add_ticket_status	\N	\N	2025-03-20 23:44:39.599849+07	1
\.


--
-- TOC entry 3535 (class 2606 OID 36271)
-- Name: Complaint Complaint_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Complaint"
    ADD CONSTRAINT "Complaint_pkey" PRIMARY KEY (id);


--
-- TOC entry 3539 (class 2606 OID 36286)
-- Name: Engineer Engineer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Engineer"
    ADD CONSTRAINT "Engineer_pkey" PRIMARY KEY (id);


--
-- TOC entry 3537 (class 2606 OID 36279)
-- Name: Ticket Ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY (id);


--
-- TOC entry 3533 (class 2606 OID 36259)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3540 (class 2606 OID 36287)
-- Name: Ticket Ticket_complaintId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES public."Complaint"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3541 (class 2606 OID 36292)
-- Name: Ticket Ticket_engineerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES public."Engineer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-03-21 00:08:03 WIB

--
-- PostgreSQL database dump complete
--

