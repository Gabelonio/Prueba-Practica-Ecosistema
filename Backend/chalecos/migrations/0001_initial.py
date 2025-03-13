# Generated by Django 5.1.7 on 2025-03-13 10:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('beneficiarios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chaleco',
            fields=[
                ('serial', models.IntegerField(primary_key=True, serialize=False)),
                ('beneficiario_cedula', models.ForeignKey(db_column='beneficiario_cedula', on_delete=django.db.models.deletion.CASCADE, to='beneficiarios.beneficiario')),
            ],
            options={
                'db_table': 'chalecos',
            },
        ),
    ]
