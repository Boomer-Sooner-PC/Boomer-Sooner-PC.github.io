import subprocess
import shutil


def compile():
    # compile the gatsby code
    subprocess.call('cd src && npm run build', shell=True)
    print('Gatsby code compiled successfully!')
    # cut the files from the public folder and paste them in the ./build folder
    shutil.rmtree('./build')
    shutil.copytree('./src/public', './build')
    print('Files copied successfully!')
    # remove the public folder
    shutil.rmtree('./src/public')
    print('Public folder removed successfully!')
    # remove the .cache folder
    shutil.rmtree('./src/.cache')
    print('.cache folder removed successfully!')

    print('Compilation completed successfully!')


if __name__ == '__main__':
    compile()
