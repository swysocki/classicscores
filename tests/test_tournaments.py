import pytest
import json
from pprint import pprint

from classicscores.views.tournaments import aggregate_scores

def test_aggregate_scores():
    with open('tests/scores_dump.json') as file:
        t_list = json.loads(file.read())
    new_list = aggregate_scores(t_list)
    # pprint(new_list)