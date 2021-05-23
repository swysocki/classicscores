# ClassicScores

>Warning: Untested. This was migrated from the classicscores.com repo without being tested.


## FAQ

- Add Bulk Scores

There is a populate script that allows bulk data to be added using the Tournament and Scores models.  The data must be in JSON format with the following schema:

```
{
        "year": "1992",
        "location": "Plattekill, NY",
        "name": "World Cup",
        "league": "National Professional Paintball League (NPPL)",
        "results": [
            {
                "division": "PRO",
                "format": "10M",
                "team": "All Americans",
                "place": "1"
            },
            {
                "division": "PRO",
                "format": "10M",
                "team": "Predators UK",
                "place": "2"
            },
            {
                "division": "PRO",
                "format": "10M",
                "team": "Aftershock",
                "place": "3"
            }
        ]
    }
```

The utility must be run via `manage.py` shell:

```
$ python3 ./manage.py shell
```

You can then import the module and use it to upload:

```
>>> from tournaments import populate
```

- How do I contribute?

Contact admin@classicscores.com with any contributions, corrections or suggestions. 


