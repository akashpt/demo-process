from PyQt5.QtCore import QObject, pyqtSlot


class Bridge(QObject):

    def __init__(self, app_ref=None):
        super().__init__()
        self.app_ref = app_ref

    # =========================
    # PAGE METHODS
    # =========================

    @pyqtSlot()
    def goHome(self):
        print("Home Page Triggered")

    @pyqtSlot()
    def goPage1(self):
        print("Page 1 Triggered")

    @pyqtSlot()
    def goPage2(self):
        print("Page 2 Triggered")
