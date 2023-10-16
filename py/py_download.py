import sys
# import random
import string
data= sys.argv
# data=["https://youtube.com/shorts/CMJ3YO_0iGs?feature=share","mp4","360p"]
# print(data)
del data[0]
linkf=data[0]
typef=data[1]
filterf=data[2]
if(filterf=='240p'):
    filterf='360p'
# def generate_random_text(length):
#     letters = string.ascii_lowercase
#     return ''.join(random.choice(letters) for i in range(length))

# random_text = generate_random_text(10)
# print(random_text)
# print(data)
from pytube import YouTube

yt = YouTube(linkf)

streams = yt.streams.filter(progressive=True,res=filterf)
stream = streams.first()
nu=stream.default_filename
nam=nu+'.'+typef
src='./src/donlwdes'
src2='./donlwdes'

# stream.download()
stream.download(output_path=src,filename=nam)
print(nam)
# else:
#    stream.download()
#    print(nam)



