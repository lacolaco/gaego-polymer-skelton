#!/usr/bin/env bash

goimports -w .

goapp test -v .
