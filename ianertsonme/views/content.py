from flask import Blueprint, render_template, abort
from github import Github
from ianertsonme.config import config
import glob
import ntpath


bp = Blueprint(__name__, __name__, template_folder='templates')

@bp.route('/content/<filename>')
def show(filename):
    if filename == 'github.html':
        g = Github(config['github']['username'], config['github']['password'])

        repos = list(g.get_user().get_repos())
        repos.sort(key=lambda x: x.stargazers_count, reverse=True)

        return render_template(filename, repos=repos)

    if filename == 'gallery.html':
        images = [ntpath.basename(path) for path in glob.glob('ianertsonme/static/gallery/*.jpg')]

        return render_template(filename, images=images)
            
    return render_template(filename)
