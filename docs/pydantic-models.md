"""
Pydantic Model Templates (documentation-only)

Location: docs/pydantic-models.md

Purpose: canonical, copy-paste-ready Pydantic models to guide backend implementation and JSON Schema generation.
"""

from typing import List, Optional, Dict, Any
from datetime import date
from pydantic import BaseModel, HttpUrl


class CTA(BaseModel):
    label: str
    href: str


class SocialLink(BaseModel):
    label: str
    href: HttpUrl


class Home(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    ctaPrimary: Optional[CTA] = None
    ctaSecondary: Optional[CTA] = None
    highlights: Optional[List[str]] = []
    badges: Optional[List[str]] = []
    social: Optional[List[SocialLink]] = []
    body: Optional[str] = None


class About(BaseModel):
    id: str
    headline: str
    bio: Optional[str] = None
    strengths: Optional[List[str]] = []
    values: Optional[List[str]] = []
    currentFocus: Optional[List[str]] = []
    cta: Optional[CTA] = None
    narrative: Optional[str] = None


class Project(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    technologies: Optional[List[str]] = []
    gradient: Optional[str] = None
    demoUrl: Optional[HttpUrl] = None
    sourceUrl: Optional[HttpUrl] = None
    image: Optional[str] = None
    featured: Optional[bool] = False


class BlogPost(BaseModel):
    id: str
    title: str
    excerpt: Optional[str] = None
    content_markdown: Optional[str] = None
    content_html: Optional[str] = None
    publishDate: Optional[date] = None
    readTime: Optional[int] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = []
    featured: Optional[bool] = False
    image: Optional[str] = None
    status: Optional[str] = 'published'
    url: Optional[HttpUrl] = None


class ContactMethod(BaseModel):
    type: str
    icon: Optional[str] = None
    label: str
    value: str
    url: Optional[HttpUrl] = None


class Skill(BaseModel):
    name: str
    category: str
    proficiency: str
    icon: Optional[str] = None


class LearningJourneyExpanded(BaseModel):
    overview: Optional[str] = None
    keyLearnings: Optional[List[str]] = []
    technologies: Optional[List[str]] = []
    achievements: Optional[List[str]] = []
    challenges: Optional[List[str]] = []
    nextSteps: Optional[List[str]] = []


class LearningJourneyItem(BaseModel):
    id: str
    title: str
    period: str
    category: str
    description: Optional[str] = None
    expandedContent: Optional[LearningJourneyExpanded] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    isExpanded: Optional[bool] = False


class WebsiteType(BaseModel):
    id: str
    title: str
    icon: Optional[str] = None
    useCase: Optional[str] = None
    example: Optional[str] = None
    gradient: Optional[str] = None


# Notes
# - These templates are documentation-only. When implementing the backend, copy into backend codebase and
#   generate JSON Schemas via Pydantic's `schema()` for contract tests.
# - Adjust optional vs required fields after final discovery with frontend owners.
