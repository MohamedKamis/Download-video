import sys
data1= sys.argv
del data1[0]
data1= ' '.join(data1)

from pytube import YouTube

url = (data1)



yt = YouTube(url)
List=[]
for stream in yt.streams:
    if(stream.resolution!=None ):
        List.append(stream.resolution)
my_set = set(List)

data1= ' '.join(my_set)
print(data1)
