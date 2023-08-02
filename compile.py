import subprocess
import shutil
import os


def compile():

    # empty ./ builds
    shutil.rmtree('./build', ignore_errors=True)

    # compile the react code
    subprocess.call('cd src && npm run build', shell=True)
    print('React code compiled successfully!')

    # copy ./ projects to ./build folder where the compiled react code is
    shutil.copytree('./projects', './build/projects')

    print("Compile complete!")


if __name__ == '__main__':
    compile()