
# import OS module
import os
import subprocess

def read_txt():
    # open text file in read mode
    text_file = open("F:/Android_Development_Projects/HumanGesture/dataset.txt", "r")
    # read whole file to a string
    data = text_file.read()
    # close file
    text_file.close()
    return data

def get_file_names(data):
    # Get the list of all files and directories
    path = "F://Android_Development_Projects//HumanGesture//public//uploads"
    dir_list = os.listdir(path)
    for i in dir_list:
        if i in data:
            pass
        else:
            if i.__contains__(".mp4"):
                data = data +"\n"
                data=data+i
    f = open("F:/Android_Development_Projects/HumanGesture/dataset.txt", "w")

    f.write(data.strip())

def execute_frames_cmd():
    subprocess.call([r"F:\Android_Development_Projects\posenet_nodejs_setup-master\Python Scripts\framer.bat"])







data = read_txt()
get_file_names(data)
execute_frames_cmd()