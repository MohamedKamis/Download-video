import sys
data1= sys.argv
del data1[0]
link=data1[0]
targt=data1[1]
from pytube import YouTube
dir_path="./donlwdes"
import os
for file_name in os.listdir(dir_path):
    # construct the full file path by joining the directory path and file name
    file_path = os.path.join(dir_path, file_name)
    # check if the file is a regular file (not a directory or symlink)
    if os.path.isfile(file_path):
        # remove the file
        os.remove(file_path)

# if(targt=='youtube'):
# print(targt)
yt = YouTube(link)
List=[]
for stream in yt.streams:
    if(stream.resolution!=None ):
        List.append(stream.resolution)
my_set = set(List)

data1= ' '.join(my_set)
# data1="144 360 1080"
print(data1)
# else:
#     print(data1[1])
