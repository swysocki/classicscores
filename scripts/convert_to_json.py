import csv, json
from pprint import pprint
from operator import itemgetter
from itertools import groupby


def get_data_fields(fields):
    """ Returns the data field indexes"""
    print(fields)
    tourn_fields = itemgetter(
        fields.index("year"),
        fields.index("league"),
        fields.index("location"),
        fields.index("name"),
    )
    result_fields = itemgetter(
        fields.index("division"),
        fields.index("format"),
        fields.index("team"),
        fields.index("place"),
    )


    return tourn_fields, result_fields


def aggregate_results(tourn_list):
    """
    Group list by year, league, location, name, division, format
    Assume the items are sorted so that the whole list will not be iterated for
    each group

    {
      'year': 2016,
      'league': 'NPPL',
      'location': 'New York, NY',
      'name': 'My Tourn',
      'results': [
        {
          'format':'10-man',
          'division': 'Amateur',
          'team': 'My Team',
          'place': '1'
        }
      ]
    }
    """
    field_list = tourn_list.pop(0)
    t_getter, p_getter = get_data_fields(field_list)

    t_list = []
    for g1, v1 in groupby(tourn_list, t_getter):
        tourn = {
            "year": g1[0],
            "league": g1[1],
            "location": g1[2],
            "name": g1[3],
            "results": [],
        }
        for g2, v2 in groupby(v1, p_getter):
            tourn["results"].append(
                {"division": g2[0], "format": g2[1], "team": g2[2], "place": g2[3]}
            )
        t_list.append(tourn)
    return t_list

if __name__ == "__main__":
    with open('data.csv') as f:
        d = csv.reader(f)
        l = list(d)
        results = aggregate_results(l)
    with open('data.json', "w") as df:
        json.dump(results, df)