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
    shutil.copytree('./projects', './build/builds')

    # make a copy of the index.html as 404.html
    shutil.copyfile('./build/index.html', './build/404.html')

    # remove all .md files from the folders in the ./build/builds folder
    for root, dirs, files in os.walk('./build/builds'):
        for file in files:
            if file.endswith('.md'):
                os.remove(os.path.join(root, file))

    # make a file called CNAME in the ./build folder with "michaelmanders.com" in it
    with open('./build/CNAME', 'w') as f:
        f.write('michaelmanders.com')

    print("Compile complete!")


if __name__ == '__main__':
    compile()
