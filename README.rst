.. image:: https://travis-ci.org/clytwynec/edx-custom-a11y-rules.svg?branch=master
    :target: https://travis-ci.org/clytwynec/edx-custom-a11y-rules


Overview
--------

This package is intended to be used with Bok Choy's `interface to aXe Core accessibility auditing library <http://bok-choy.readthedocs.org/en/latest/api_reference.html#module-bok_choy.a11y.axe_core_ruleset>`_.

``lib/custom_a11y_ruleset.js`` contains some edX-specific accessibility rules, written to be compatible with aXe core.

Please review the  `Bok Choy documentation <http://bok-choy.readthedocs.org/en/latest/api_reference.html#module-bok_choy.a11y.axe_core_ruleset>`_ for details about how to include custom rules
in a page audit.


Installation
------------

Install from github with:

.. code:: bash

    npm install edx/edx-custom-a11y-rules



Writing new rules
-----------------


Getting things set up for development, make sure npm is installed, then:

.. code:: bash

    git clone https://github.com/edx/edx-custom-a11y-rules.git
    cd edx-custom-a11y-rules
    make develop


To run tests for the custom ruleset in "dev" mode:

.. code:: bash

    make test-dev


To run tests for the custom ruleset in "single-run" mode:

.. code:: bash

    make test
