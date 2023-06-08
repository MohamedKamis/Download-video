import sys
import random
import string
data= sys.argv
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

streams = yt.streams.filter(res=filterf)
stream = streams.first()
nam=random_text+'.'+typef
src='./dist/donlwdes'

stream.download(output_path=src,filename=nam)

print(nam)


