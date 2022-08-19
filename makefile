xpi: clean
	zip -x /*.code-workspace  makefile information.txt README.adoc -r phoneToLinkAddOn.xpi *

clean:
	rm -f phoneToLinkAddOn.xpi.xpi
