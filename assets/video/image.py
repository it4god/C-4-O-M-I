import os
directory = r"D:\C4OMI\c4omi\assets\video"
for path, folders, files in os.walk(directory):
    for filename in files:
        if filename != "image.py" and filename != "require.txt":
            f = open("require.txt", "a")
            f.write("'" + filename.replace("-MQ.jpg", "") + "' : require('" + filename + "'), \n")
            f.close()