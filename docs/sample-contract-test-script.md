**Sample Contract Test Script (Python, pytest, jsonschema)**

This is a documentation-only sample that shows how to run contract tests validating backend endpoints against JSON Schemas. It assumes you have fixtures in `tests/fixtures/` and JSON Schemas available.

Install dependencies (example):

```bash
python -m pip install pytest requests jsonschema
```

Example `tests/test_contracts.py` (conceptual):

```python
import requests
from jsonschema import validate

BASE = 'http://localhost:8000'

def load_schema(name):
    import json
    with open(f'docs/schemas/{name}.json') as f:
        return json.load(f)

def test_get_home_contract():
    schema = load_schema('home')
    r = requests.get(f'{BASE}/api/home')
    assert r.status_code == 200
    data = r.json()
    validate(instance=data, schema=schema)

def test_get_projects_contract():
    schema = load_schema('project')
    r = requests.get(f'{BASE}/api/projects')
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    if data:
        validate(instance=data[0], schema=schema)

def test_health():
    r = requests.get(f'{BASE}/health')
    assert r.status_code == 200
    assert r.json().get('status') == 'ok'

```

CI integration notes
--------------------
- Start the FastAPI app in a background step (or use a test client) before running pytest.
- Fail the job if any contract test fails.

This sample is conceptual — adapt paths and schema loaders to your CI and repo layout.
