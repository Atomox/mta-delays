# MTA Interruption Feeds


## Data
Data is pulled from the MTA static service status API, and stashed in files in the `/data` directory. We will always pull from the file first, unless we see the cache is stale (adjustable, in minutes). 


# @TODO
Ultimately, we want to start building a DB of data. So, run a cron every 10 minutes, and stash any data.



# Issues

### Parsing Feeds
- Not all listed lines are interrupted when parsing affected lines.
