--
-- PostgreSQL database dump
--

\restrict WN6pzga3LHFZB3QOpeEMlXbSyfRs0iZ8K7wLsvQ7DrJfQTKb9wxwtbZx1AQA8o9

-- Dumped from database version 16.14 (Homebrew)
-- Dumped by pg_dump version 16.14 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: arwabaig
--

CREATE TABLE public.answers (
    id uuid NOT NULL,
    game_id text,
    celebrity_name text
);


ALTER TABLE public.answers OWNER TO arwabaig;

--
-- Name: game; Type: TABLE; Schema: public; Owner: arwabaig
--

CREATE TABLE public.game (
    id uuid NOT NULL,
    room_code text,
    current_celebrity text,
    status text
);


ALTER TABLE public.game OWNER TO arwabaig;

--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: arwabaig
--

COPY public.answers (id, game_id, celebrity_name) FROM stdin;
\.


--
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: arwabaig
--

COPY public.game (id, room_code, current_celebrity, status) FROM stdin;
\.


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: arwabaig
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: arwabaig
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict WN6pzga3LHFZB3QOpeEMlXbSyfRs0iZ8K7wLsvQ7DrJfQTKb9wxwtbZx1AQA8o9

