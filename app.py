import os

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# read directory list
location = os.curdir + '/files'
files = os.listdir(location)
# print file names
idx = 1
for file in files:
  print(bcolors.OKCYAN + str(idx) + ' - ' + file)
  idx += 1

# give options for re-naming (characters)

# show possible rename list