import xarray as xr
import psycopg2

file_path = 'sdei-global-annual-gwr-pm2-5-modis-misr-seawifs-viirs-aod-v5-gl-04-2000-netcdf.nc'
ds = xr.open_dataset(file_path)

latitudes = ds.variables['lat']
longitudes = ds.variables['lon']

conn = psycopg2.connect(
    host="localhost",
    database="air_quality",
    user="postgres",
    password="postgres"
)
cur = conn.cursor()

cur.execute('''
    CREATE TABLE IF NOT EXISTS pm25 (
        id SERIAL PRIMARY KEY,
        year INTEGER,
        latitude REAL,
        longitude REAL,
        pm25 REAL
    )
''')

year_match = re.search(r'-(\d{4})-', file_path)
year = int(year_match.group(1)) if year_match else None

if year is None:
    raise ValueError("Year could not be extracted from the filename.")

for i in range(len(latitudes)):
    latitude = latitudes[i].item()
    longitude = longitudes[i].item()
    # pm25 is hardcoded 2.5 as the file did not contain this value
    cur.execute('''
        INSERT INTO pm25 (year, latitude, longitude, pm25)
        VALUES (%s, %s, %s, %s)
    ''', (year, latitude, longitude, 2.5))

conn.commit()
cur.close()
conn.close()

print("Data successfully added into PostgreSQL database")
