# Generated by Django 3.2.20 on 2023-07-18 01:04
from django.db import migrations
from api.models import CreditTradeCategory

def insert_categories(apps, schema_editor):
    CreditTradeCategory = apps.get_model('api', 'CreditTradeCategory')
    categories = [
        ('A', 'Reached within the last 6 months'),
        ('B', 'Reached between 6 months to 1 year ago'),
        ('C', 'Reached more than 1 year ago'),
        ('D', 'Override based on value of price per credit'),
    ]

    for category, description in categories:
        CreditTradeCategory.objects.get_or_create(category=category, description=description)

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_compliancereport_traversal'),
    ]

    operations = [
        migrations.RunPython(insert_categories),
    ]
