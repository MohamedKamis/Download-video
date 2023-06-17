import requests
from bs4 import BeautifulSoup

video_url = "https://fb.watch/l6Ec73rvrB/"

response = requests.get(video_url)
soup = BeautifulSoup(response.text, "html.parser")

video_data = soup.find("video")
video_src = video_data["src"]

video_url = "https:" + video_src

print("Downloading video from:", video_url)

r = requests.get(video_url, allow_redirects=True)
open("video.mp4", "wb").write(r.content)

print("Video downloaded successfully!") 
