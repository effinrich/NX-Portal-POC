{{/*
Expand the name of the chart.
*/}}
{{- define "phc-base.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "phc-base.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "phc-base.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "phc-base.labels" -}}
helm.sh/chart: {{ include "phc-base.chart" . }}
{{ include "phc-base.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "phc-base.selectorLabels" -}}
app.kubernetes.io/name: {{ include "phc-base.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "phc-base.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "phc-base.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create the name of the certificate to use
*/}}
{{- define "phc-base.certificateName" -}}
{{- if .Values.certificate.create }}
{{- default (include "phc-base.fullname" .) .Values.certificate.name }}
{{- else }}
{{- default "default" .Values.certificate.name }}
{{- end }}
{{- end }}

{{/*
Create the name of the certificate secret to use. Return nil if create is false and no name provided.
*/}}
{{- define "phc-base.certificateSecretName" -}}
{{- if .Values.certificate.secretName }}
{{- .Values.certificate.secretName | trunc 63 | trimSuffix "-" }}
{{- else if .Values.certificate.create -}}
{{- printf "%s-tls" (include "phc-base.fullname" .) }}
{{- end }}
{{- end }}

{{/*
Create the name of the managed certificate to use
*/}}
{{- define "phc-base.managedCertificateName" -}}
{{- if .Values.managedCertificate.create }}
{{- default (include "phc-base.fullname" .) .Values.managedCertificate.name }}
{{- else }}
{{- .Values.managedCertificate.name }}
{{- end }}
{{- end }}
