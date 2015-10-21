.. image:: https://travis-ci.org/edx/edx-custom-a11y-rules.svg?branch=master
    :target: https://travis-ci.org/edx/edx-custom-a11y-rules


Overview
--------

This package is intended to be used with Bok Choy's `interface to aXe Core accessibility auditing library <http://bok-choy.readthedocs.org/en/latest/api_reference.html#module-bok_choy.a11y.axe_core_ruleset>`_.

``lib/custom_a11y_ruleset.js`` contains some custom edX accessibility rules, written to be compatible with aXe core.

Please review the  `Bok Choy documentation <http://bok-choy.readthedocs.org/en/latest/api_reference.html#module-bok_choy.a11y.axe_core_ruleset>`_ for details about how to include custom rules
in a page audit.


Installation
------------

Install from github with:

.. code:: bash

    npm install edx/edx-custom-a11y-rules#v0.1.0



Writing new rules
-----------------

Getting set up for development
==============================

Make sure npm is installed, then:

.. code:: bash

    git clone https://github.com/edx/edx-custom-a11y-rules.git
    cd edx-custom-a11y-rules
    make develop


Development guides
==================

New Rules and Checks should be written in ``lib/custom_a11y_rules.js``.

* `aXe Core development guide for Rules <https://github.com/dequelabs/axe-core/blob/master/doc/developer-guide.md#rules>`_

* `aXe Core development guide for Checks <https://github.com/dequelabs/axe-core/blob/master/doc/developer-guide.md#checks>`_


Testing guide
=============

To run tests for the custom ruleset in "dev" mode:

.. code:: bash

    make test-dev


To run tests for the custom ruleset in "single-run" mode:

.. code:: bash

    make test


Testing checklist
*****************

* Write sample html files with the examples of pass/fail cases in ``test/fixtures/``.  These are the fixtures that will be used for tests.

* If you are writing a Check, add the test cases for your check to ``specCases`` in ``test/spec/checks_spec.js``.

* If you are writing a Rule, add the test cases for your rule to ``specCases`` in ``test/spec/rule_spec.js``.

* If needed, any new integration tests can go in ``test/spec/integration_spec.js``.
