import sys
import random
import string
data= sys.argv
# data=["https://youtube.com/shorts/CMJ3YO_0iGs?feature=share","mp4","360p"]
# print(data)
del data[0]
linkf=data[0]
typef=data[1]
filterf=data[2]

def generate_random_text(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

random_text = generate_random_text(10)
# print(random_text)
# print(data)
from pytube import YouTube

yt = YouTube(linkf)

streams = yt.streams.filter(progressive=True,res=filterf)
stream = streams.first()
nam=random_text+'.'+typef
src='./src/donlwdes'
src2='./donlwdes'

stream.download(output_path=src2 or src,filename=nam)
# if(stream.download(output_path=src,filename=nam)):
print(nam)
# else:
#    stream.download(output_path=src,filename=nam)
#    print(nam)



