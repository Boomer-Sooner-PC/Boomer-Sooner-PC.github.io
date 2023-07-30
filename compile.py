import subprocess
import shutil
import os


def compile():
    # compile the gatsby code
    subprocess.call('cd src && npm run build', shell=True)
    print('Gatsby code compiled successfully!')
    try:
        shutil.rmtree('./build')
        print('Build folder removed successfully!')
    except:
        pass
    shutil.copytree('./src/public', './build')
    print('Files copied successfully!')
    # remove the public folder
    shutil.rmtree('./src/public')
    print('Public folder removed successfully!')
    # remove the .cache folder
    shutil.rmtree('./src/.cache')
    print('.cache folder removed successfully!')

    print('Compilation completed successfully!')


def deploy(message):
    print("Deploying the build folder to gh-pages...")
    # deploy the build folder to gh-pages (gh-pages branch) already created
    subprocess.call(
        'git subtree push --prefix build origin gh-pages', shell=True)
    print('Build folder deployed successfully!')

    print("Deploying the src folder to master...")
    # deploy the root folder to master
    subprocess.call('git add .', shell=True)
    subprocess.call(f'git commit -m "{message}"', shell=True)
    subprocess.call('git push origin master', shell=True)

    print('Deployment completed successfully!')


if __name__ == '__main__':
    # compile()
    if input("Would you like to deply? (y/n): ").lower() == "y":
        deploy(input("Enter the commit message: "))
