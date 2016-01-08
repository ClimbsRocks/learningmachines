
# if pip is not installed, install it using the instructions at: https://pip.pypa.io/en/stable/installing/
wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py

# we're intentionally leaving in a couple of extra (commented-out) libraries that are useful for machine learning, in case you'd like to have them available for other projects
# pip install joblib
pip install numpy
pip install pandas
pip install scipy
pip install cython
# pip install xgboost
# pip install python-dateutil


# once we're working off the latest stable release, we'll be able to install sklearn through pip:
pip install sklearn

# if you want to install the latest scikit-learn development version (at the moment they're working on v0.18, which has a new neural network built in), you can install directly from github using the commands below:
# git clone https://github.com/scikit-learn/scikit-learn.git
# cd scikit-learn
# python setup.py build
# sudo python setup.py install

