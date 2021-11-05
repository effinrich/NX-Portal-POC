#!/usr/bin/env bash

set -euo pipefail

SHELL_REPO=https://api.github.com/repos/phc-health/bash-tools
DEBUG=0

if [[ "${DEBUG}" == 1 ]]; then
  set -x
fi

# check requirements
if [ -z ${GIT_TOKEN-} ]; then
  echo "you must set GIT_TOKEN env var"
  exit 1
fi

if ! command -v jq &> /dev/null; then
  echo "jq could not be found"
  exit 1
fi


function get_commands() {
  raw=$(curl -s -H "Authorization: token ${GIT_TOKEN}" \
    -H 'Accept: application/vnd.github.v3.raw' \
    "${SHELL_REPO}/contents/")
  commands=$(echo ${raw} | jq -r '.[] | select(.type | contains("dir")) | .name')
  echo ${commands}
}

function get_subcommands() {
  local command=$1
  raw=$(curl -s -H "Authorization: token ${GIT_TOKEN}" \
    -H 'Accept: application/vnd.github.v3.raw' \
    "${SHELL_REPO}/contents/${command}")
  subcommands=$(echo ${raw} | jq -r '.[] | select(.type | contains("file")) | .name')
  echo ${subcommands}
}

function print_commands() {
  local commands=("$@")
  echo "Available commands:"
  for i in "${commands[@]}"; do
    echo - ${i}
  done
}

function print_subcommands() {
  local subcommands=("$@")
  echo "Available subcommands:"
  for i in "${subcommands[@]}"; do
    echo - ${i}
  done
}


function usage() {
  echo "I route bash requests."
  echo
  echo "Usage: $0 <command> <subcommand> (-h)"
  echo "Example: $0 git semver -h"
  echo " commands     list available commands"
  echo " -h           print out this help message"
  if [[ $# -ne 0 ]]; then
    echo
    echo "------ $@ ------"
    exit 1
  fi
}

while getopts "h:" opt; do
  case ${opt} in
    h) usage ;;
    *) usage "Invalid option: -${OPTARG}" ;;
  esac
done
shift $((OPTIND-1))

# get available commands
commands=(`get_commands`)

# check if we want to list them
if [[ "$#" == 0 || "${1}" == "commands" ]]; then
  print_commands "${commands[@]}"
  exit 0
fi

# verify command
for i in "${commands[@]}"; do
  if [[ "${i}"  == "${1}" ]]; then
    command=${i}
  fi
done

if [[ -z ${command-} ]]; then
  usage "command not found - run ${0} commands for a list"
  exit 1
fi


# get available subcommands
subcommands=(`get_subcommands ${command}`)
subcommands=("${subcommands[@]%.sh}")

# check if we want to list them
if [[ "$#" == 1 || "${2}" == "subcommands" ]]; then
  print_subcommands "${subcommands[@]}"
  exit 0
fi

# verify subcommand
for i in "${subcommands[@]}"; do
  if [[ "${i}"  == "${2}" ]]; then
    subcommand=${i}
  fi
done

if [[ -z ${subcommand-} ]]; then
  usage "subcommand not found - run ${0} ${1} subcommands for a list"
  exit 1
fi

if [[ ${DEBUG} == 1 ]]; then
  echo "[DEBUG] commands: ${commands[@]}"
  echo "[DEBUG] command: ${command}"
  echo "[DEBUG] subcommands: ${subcommands[@]}"
  echo "[DEBUG] subcommand: ${subcommand}"
  echo "[DEBUG] ${SHELL_REPO}/contents/${command}/${subcommand}.sh"
fi

if [ -f "scripts/${command}/${subcommand}.sh" ]; then
  if [[ ${DEBUG} == 1 ]]; then
    echo "[DEBUG] local override: ./scripts/${command}/${subcommand}.sh"
  fi
  cat "./scripts/${command}/${subcommand}.sh" | bash -s -- "${@:3}"
else
  curl -s -H "Authorization: token ${GIT_TOKEN}" \
    -H 'Accept: application/vnd.github.v3.raw' \
    "${SHELL_REPO}/contents/${command}/${subcommand}.sh" | bash -s -- "${@:3}"
fi
exit 0
