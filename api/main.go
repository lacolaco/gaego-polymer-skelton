package app

import (
	"net/http"
	"os"

	"appengine"
)

func init() {
	http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	filename := r.URL.Path
	if filename == "/" || filename == "" {
		filename = "/index.html"
	}
	filename = "./publish" + filename
	c.Debugf("GET file: %s", filename)
	if isFileExist(filename) {
		http.ServeFile(w, r, filename)
	} else {
		http.Error(w, "file not found", http.StatusNotFound)
	}
}

func isFileExist(filename string) bool {
	fi, err := os.Stat(filename)
	if err != nil {
		return false
	}
	if fi.IsDir() {
		return false
	}
	return true
}
