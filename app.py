import sys
import os
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import QUrl

from bridge import Bridge


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Multi Page App")
        self.resize(1900, 960)

        # Create Web View
        self.view = QWebEngineView()
        self.setCentralWidget(self.view)

        # Create Web Channel
        self.channel = QWebChannel()

        # Create Bridge (pass self if needed)
        self.bridge = Bridge(self)

        # Register bridge
        self.channel.registerObject("bridge", self.bridge)

        # Attach channel to page
        self.view.page().setWebChannel(self.channel)

        # Load First Page
        self.load_page("index.html")

    # =========================
    # Page Loader Method
    # =========================
    def load_page(self, filename):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        html_path = os.path.join(base_dir, "templates", filename)
        self.view.load(QUrl.fromLocalFile(html_path))


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
