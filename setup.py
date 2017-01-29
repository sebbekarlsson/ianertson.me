import os
from setuptools import setup


setup(
    name='ianertsonme',
    version='1.0',
    description='Ianertson website',
    author='Sebastian Robert Karlsson',
    author_email='sebbekarlsson97@gmail.com',
    url='http://www.ianertson.me/',
    install_requires=[
        'flask',
        'pygithub'
    ]
)
