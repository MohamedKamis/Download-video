# import requests
# from bs4 import BeautifulSoup

# video_url = "https://fb.watch/l6Ec73rvrB/"

# response = requests.get(video_url)
# soup = BeautifulSoup(response.text, "html.parser")

# video_data = soup.find("video")
# video_src = video_data["src"]

# video_url = "https:" + video_src

# print("Downloading video from:", video_url)

# r = requests.get(video_url, allow_redirects=True)
# open("video.mp4", "wb").write(r.content)

# print("Video downloaded successfully!") 
# data=["https://youtube.com/shorts/CMJ3YO_0iGs?feature=share","mp4","360p"]
# print(data)

# print(random_text)
# print(data)
from pytube import YouTube
linkf='https://youtu.be/hccX6JEYD2E'
yt = YouTube(linkf)

streams = yt.streams.filter(res='144p',file_extension='mp4')
print('complit Filter......')
stream = streams.first().audio_codec
print(stream)
# nam=random_text+'.'+typef
# src='./src/donlwdes'
# src2='./donlwdes'
# print('start downlode........')

# stream.download(filename=)
# # if(stream.download(output_path=src,filename=nam)):
# print('done')
# # else:
#    stream.download(output_path=src,filename=nam)
#    print(nam)



